from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path
from llm_service import query_model

router = APIRouter()

class ClauseCompareRequest(BaseModel):
    clause_type: str
    country_1: str
    country_2: str

@router.post("/compare")
async def compare_clause(request: ClauseCompareRequest):
    try:
        #load comparator prompt template
        prompt_path = Path("prompts/comparator_prompt.txt")
        if not prompt_path.exists():
            raise HTTPException(status_code=500, detail="Prompt template not found")
        
        with prompt_path.open("r") as file:
            prompt_template = file.read()

        #format prompt with request data
        formatted_prompt = prompt_template.format(
            clause_type=request.clause_type,
            country_1=request.country_1,
            country_2=request.country_2
        )

        #query llm service
        result = query_model(formatted_prompt)

        #return structured response
        return {
            "country_1": result.get("country_1", ""),
            "country_2": result.get("country_2", ""),
            "key_differences": result.get("key_differences", "")
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error comparing clauses: {str(e)}")