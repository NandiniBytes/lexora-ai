from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path
import logging
import json
import re
from typing import Dict, Any, Optional
from llm_service import query_model

router = APIRouter()
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

class ClauseCompareRequest(BaseModel):
    clause_type: str
    country_1: str
    country_2: str

def normalize_output(output: str) -> str:
    """Normalize the LLM output for parsing."""
    # Remove markdown code blocks
    output = re.sub(r'^```(json)?\n?|\n?```$', '', output, flags=re.MULTILINE)
    # Remove extra whitespace
    output = output.strip()
    # Normalize quotes
    output = output.replace('\\"', '"')
    return output

def parse_response(text: str, country_1: str, country_2: str) -> Dict[str, Any]:
    """Parse the LLM response with multiple fallback strategies."""
    normalized = normalize_output(text)
    
    # Strategy 1: Complete JSON parse
    try:
        data = json.loads(normalized)
        if isinstance(data, dict):
            return {
                "country_1": data.get("country_1", country_1),
                "country_2": data.get("country_2", country_2),
                "key_differences": data.get("key_differences", "No differences found")
            }
    except json.JSONDecodeError:
        pass
    
    # Strategy 2: Find JSON substring
    json_match = re.search(r'\{[\s\S]*\}', normalized)
    if json_match:
        try:
            data = json.loads(json_match.group(0))
            if isinstance(data, dict):
                return {
                    "country_1": data.get("country_1", country_1),
                    "country_2": data.get("country_2", country_2),
                    "key_differences": data.get("key_differences", "No differences found")
                }
        except json.JSONDecodeError:
            pass
    
    # Strategy 3: Extract text sections
    def extract(pattern: str, default: str) -> str:
        match = re.search(pattern, normalized, re.IGNORECASE | re.DOTALL)
        return match.group(1).strip() if match else default
    
    return {
        "country_1": extract(
            rf'(?:country[_\s]*1|{re.escape(country_1)}).*?[:\\-\\s]+(.*?)(?=\n|$)',
            f"Overview of {country_1}"
        ),
        "country_2": extract(
            rf'(?:country[_\s]*2|{re.escape(country_2)}).*?[:\\-\\s]+(.*?)(?=\n|$)',
            f"Overview of {country_2}"
        ),
        "key_differences": extract(
            r'(?:key\s*differences|comparison).*?[:\\-\\s]+(.*?)(?=\n|$)',
            "Differences not specified"
        )
    }

@router.post("/compare")
async def compare_clause(request: ClauseCompareRequest) -> Dict[str, Any]:
    """Compare legal clauses between countries."""
    try:
        logger.info(f"Request received: {request.dict()}")
        
        # Load prompt template
        prompt_path = Path("prompts/comparator_prompt.txt")
        if not prompt_path.exists():
            logger.error("Prompt template missing at: %s", prompt_path)
            raise HTTPException(500, "Prompt template not found")
        
        with prompt_path.open("r", encoding="utf-8") as f:
            prompt = f.read().format(
                clause_type=request.clause_type,
                country_1=request.country_1,
                country_2=request.country_2
            )
        
        # Get LLM response
        response = query_model(prompt)
        output = response.get("explanation", "").strip()
        logger.debug(f"LLM Output:\n{output}")
        
        # Parse and return response
        return parse_response(output, request.country_1, request.country_2)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Processing failed: {str(e)}")
        logger.debug(f"Raw output:\n{output if 'output' in locals() else 'N/A'}")
        raise HTTPException(500, "Failed to process request")

# Update your prompt template to require strict JSON format:
"""
Compare {clause_type} clauses between {country_1} and {country_2}.

Respond STRICTLY in this JSON format:

{
    "country_1": "Description...",
    "country_2": "Description...", 
    "key_differences": [
        "Difference 1",
        "Difference 2"
    ]
}

Notes:
- Use only double quotes
- Maintain exact structure
- Include all key differences
"""