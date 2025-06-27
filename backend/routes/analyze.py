#Handles POST requests to analyze a legal question using RAG
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from backend.langchain.rag_pipeline import run_rag_pipeline
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter()

class QueryInput(BaseModel):
    question: str

@router.post("/analyze")
def analyze_legal_question(input: QueryInput, db: Session = Depends(get_db)):
    try:
        answer = run_rag_pipeline(input.question, db=db)
        return {"success": True, "question": input.question, "answer": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
