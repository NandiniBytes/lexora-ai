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

        #assuming llm returns a structured response with explanation and legal domain
        return {
            "explanation": result.get("explanation", ""),
            "legal_domain": result.get("legal_domain", "")
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error explainning clause: {str(e)}")