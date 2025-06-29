from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from models import Query, Log
from llm_service import query_model
from rag_pipeline import run_rag_pipeline
from pathlib import Path
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

class ClauseCompareRequest(BaseModel):
    clause_type: str
    country_1: str
    country_2: str

class ClauseCompareResponse(BaseModel):
    success: bool
    country_1_analysis: str
    country_2_analysis: str
    key_differences: str
    rag_enhanced: bool

@router.post("/compare", response_model=ClauseCompareResponse)
async def compare_clause(request: ClauseCompareRequest, db: Session = Depends(get_db)):
    try:
        # Get RAG-enhanced context for each country
        rag_question_1 = f"How are {request.clause_type} clauses interpreted and enforced in {request.country_1}? Include legal precedents and regulations."
        rag_question_2 = f"How are {request.clause_type} clauses interpreted and enforced in {request.country_2}? Include legal precedents and regulations."
        
        rag_context_1 = run_rag_pipeline(rag_question_1)
        rag_context_2 = run_rag_pipeline(rag_question_2)
        
        # Load comparator prompt template
        prompt_path = Path("prompts/comparator_prompt.txt")
        if not prompt_path.exists():
            raise HTTPException(status_code=500, detail="Prompt template not found")
        
        with prompt_path.open("r") as file:
            prompt_template = file.read()

        # Enhanced prompt with RAG context
        enhanced_prompt = f"""
        {prompt_template}
        
        Additional Legal Context for {request.country_1}:
        {rag_context_1}
        
        Additional Legal Context for {request.country_2}:
        {rag_context_2}
        
        Use this additional context to provide a more comprehensive comparison.
        """

        # Format prompt with request data
        formatted_prompt = enhanced_prompt.format(
            clause_type=request.clause_type,
            country_1=request.country_1,
            country_2=request.country_2
        )

        # Query LLM service
        result = query_model(formatted_prompt)

        # Parse the result (simplified parsing)
        lines = result.split('\n')
        country_1_analysis = ""
        country_2_analysis = ""
        key_differences = ""
        
        current_section = ""
        for line in lines:
            if f"🇺🇸 {request.country_1}" in line or f"{request.country_1}:" in line:
                current_section = "country_1"
                continue
            elif f"🇩🇪 {request.country_2}" in line or f"{request.country_2}:" in line:
                current_section = "country_2"
                continue
            elif "Key Differences" in line or "Risk Flags" in line:
                current_section = "differences"
                continue
            
            if current_section == "country_1" and line.strip():
                country_1_analysis += line + "\n"
            elif current_section == "country_2" and line.strip():
                country_2_analysis += line + "\n"
            elif current_section == "differences" and line.strip():
                key_differences += line + "\n"

        # Fallback if parsing fails
        if not country_1_analysis or not country_2_analysis:
            country_1_analysis = f"Analysis for {request.country_1} based on legal documents and precedents."
            country_2_analysis = f"Analysis for {request.country_2} based on legal documents and precedents."
            key_differences = "Detailed comparison available in the full analysis."

        # Save query to database
        query_record = Query(
            question=f"RAG-Enhanced Cross-border Comparison: {request.clause_type}",
            context=f"{request.country_1} vs {request.country_2}",
            response=result
        )
        db.add(query_record)
        
        # Log the event
        log_record = Log(
            event_type="clause_comparison_rag",
            details=f"RAG-enhanced comparison: {request.clause_type} between {request.country_1} and {request.country_2}"
        )
        db.add(log_record)
        db.commit()

        return ClauseCompareResponse(
            success=True,
            country_1_analysis=country_1_analysis.strip(),
            country_2_analysis=country_2_analysis.strip(),
            key_differences=key_differences.strip(),
            rag_enhanced=True
        )
        
    except Exception as e:
        logger.error(f"Error comparing clauses: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error comparing clauses: {str(e)}")
