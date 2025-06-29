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

class ClauseExplainRequest(BaseModel):
    clause: str

class ClauseExplainResponse(BaseModel):
    success: bool
    explanation: str
    legal_domain: str
    rag_enhanced: bool

@router.post("/explain", response_model=ClauseExplainResponse)
async def explain_clause(request: ClauseExplainRequest, db: Session = Depends(get_db)):
    try:
        # First, get RAG-enhanced context about similar clauses
        rag_question = f"Explain legal clauses similar to: {request.clause[:200]}... What are the common interpretations and legal implications?"
        rag_context = run_rag_pipeline(rag_question)
        
        # Load explainer prompt template
        prompt_path = Path("prompts/explainer_prompt.txt")
        if not prompt_path.exists():
            raise HTTPException(status_code=500, detail="Prompt template not found")
        
        with prompt_path.open("r") as file:
            prompt_template = file.read()

        # Enhanced prompt with RAG context
        enhanced_prompt = f"""
        {prompt_template}
        
        Additional Legal Context from Legal Documents:
        {rag_context}
        
        Use this context to provide a more comprehensive explanation.
        """

        # Format prompt with clause
        formatted_prompt = enhanced_prompt.format(clause=request.clause)

        # Query LLM service
        result = query_model(formatted_prompt)

        # Parse string response
        lines = result.split("\n")
        explanation = ""
        domain = ""

        for line in lines:
            if line.lower().startswith("explanation"):
                explanation = line.split(":", 1)[1].strip()
            elif line.lower().startswith("domain:"):
                domain = line.split(":", 1)[1].strip()

        # Fallback if parsing fails
        if not explanation:
            explanation = result
        if not domain:
            domain = "General Legal"

        # Save query to database
        query_record = Query(
            question="RAG-Enhanced Clause Explanation",
            context=request.clause,
            response=result
        )
        db.add(query_record)
        
        # Log the event
        log_record = Log(
            event_type="clause_explanation_rag",
            details=f"Explained clause with RAG enhancement: {len(request.clause)} characters"
        )
        db.add(log_record)
        db.commit()

        return ClauseExplainResponse(
            success=True,
            explanation=explanation,
            legal_domain=domain,
            rag_enhanced=True
        )
    
    except Exception as e:
        logger.error(f"Error explaining clause: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error explaining clause: {str(e)}")
