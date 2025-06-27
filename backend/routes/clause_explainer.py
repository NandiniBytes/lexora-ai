from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path
from llm_service import query_model

router = APIRouter()

class ClauseExplainRequest(BaseModel):
    clause: str

@router.post("/explain")
async def explain_clause(request: ClauseExplainRequest):
    try:
        #load explainer prompt template
        prompt_path = Path("prompts/explainer_prompt.txt")
        if not prompt_path.exists():
            raise HTTPException(status_code=500, detail="Prompt template not found")
        
        with prompt_path.open("r") as file:
            prompt_template = file.read()

        # format prompt with clause
        formatted_prompt = prompt_template.format(clause=request.clause)

        #query llm service
        result = query_model(formatted_prompt)

        #parse string response
        lines = result.split("\n")
        explanation = ""
        domain = ""

        for line in lines:
            if line.lower().startswith("explanation"):
                explanation = line.split(":", 1)[1].strip()
            elif line.lower().startswith("domain:"):
                domain = line.split(":", 1)[1].strip()

        #assuming llm returns a structured response with explanation and legal domain
        return {
            "explanation": explanation,
            "legal_domain": domain
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error explainning clause: {str(e)}")