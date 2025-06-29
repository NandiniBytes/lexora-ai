from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from models import Query, Log
from rag_pipeline import run_rag_pipeline
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

class LegalQARequest(BaseModel):
    question: str

class LegalQAResponse(BaseModel):
    success: bool
    answer: str
    sources_used: bool
    confidence: str

@router.post("/ask", response_model=LegalQAResponse)
async def ask_legal_question(request: LegalQARequest, db: Session = Depends(get_db)):
    try:
        if not request.question.strip():
            raise HTTPException(status_code=400, detail="Question cannot be empty")
        
        # Run RAG pipeline to get enhanced answer
        logger.info(f"Processing legal question: {request.question}")
        answer = run_rag_pipeline(request.question)
        
        # Save query to database
        query_record = Query(
            question=request.question,
            context="RAG-enhanced legal Q&A",
            response=answer
        )
        db.add(query_record)
        
        # Log the event
        log_record = Log(
            event_type="legal_qa",
            details=f"Answered legal question: {request.question[:100]}..."
        )
        db.add(log_record)
        db.commit()
        
        return LegalQAResponse(
            success=True,
            answer=answer,
            sources_used=True,
            confidence="High"
        )
        
    except Exception as e:
        logger.error(f"Error in legal Q&A: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health_check():
    """Health check for the legal Q&A service"""
    try:
        # Test if RAG pipeline is working
        test_answer = run_rag_pipeline("What is a contract?")
        return {
            "status": "healthy",
            "rag_pipeline": "operational",
            "test_response_length": len(test_answer)
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e)
        }
