from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.nda_generator import router as nda_router
from routes.clause_explainer import router as explainer_router
from routes.clause_comparator import router as comparator_router
from routes.download import router as download_router
from routes.legal_qa import router as legal_qa_router
from models import Base
from database import engine
import logging
import datetime
import uvicorn

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Lexora AI Backend",
    description="Enterprise-grade RAG-enhanced backend for AI-powered legal analysis using IBM Granite and legal document retrieval.",
    version="2.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create DB tables (optional - include only if not using Alembic)
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(nda_router, prefix="/api/nda", tags=["NDA Generator"])
app.include_router(explainer_router, prefix="/api/explainer", tags=["Clause Explainer"])
app.include_router(comparator_router, prefix="/api/comparator", tags=["Clause Comparator"])
app.include_router(download_router, prefix="/api/download", tags=["Download"])
app.include_router(legal_qa_router, prefix="/api/legal-qa", tags=["Legal Q&A"])

# Root route
@app.get("/", tags=["System"])
async def root():
    return {
        "message": "Lexora AI Backend with RAG Enhancement",
        "version": "2.0.0",
        "features": ["NDA Generation", "Clause Explanation", "Cross-border Comparison", "Legal Q&A", "RAG Enhancement"]
    }

# Healthcheck route
@app.get("/health", tags=["System"])
def health_check():
    return {
        "status": "running",
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "rag_enabled": True,
        "services": ["IBM Granite LLM", "FAISS Vector Store", "Legal Document Retrieval"]
    }

# Request logging middleware
@app.middleware("http")
async def log_requests(request, call_next):
    logger.info(f"📥 Request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"📤 Response status: {response.status_code}")
    return response

# Run server
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True)
