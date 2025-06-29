# Lexora AI Backend

This is the Python backend for the Lexora AI website, powered by IBM Granite 3.3-8B-Instruct model.

## Features

- **NDA Generation**: AI-powered NDA document creation
- **Clause Explanation**: Plain English explanations of legal clauses
- **Document Comparison**: Side-by-side analysis of legal documents
- **Database Integration**: PostgreSQL with SQLAlchemy ORM
- **IBM Granite Integration**: Advanced language model for legal analysis

## Setup Instructions

### 1. Install Dependencies

\`\`\`bash
cd backend
pip install -r requirements.txt
\`\`\`

### 2. Environment Configuration

Create a `.env` file in the backend directory:

\`\`\`env
DATABASE_URL=postgresql://username:password@localhost:5432/lexora_db
IBM_API_KEY=your_ibm_api_key_here
IBM_PROJECT_ID=your_project_id_here
IBM_GRANITE_URL=your_granite_url_here
IBM_MODEL_ID=ibm-granite/granite-3.3-8b-instruct
\`\`\`

### 3. Database Setup

\`\`\`bash
# Create PostgreSQL database
createdb lexora_db

# The tables will be created automatically when you start the server
\`\`\`

### 4. Start the Server

\`\`\`bash
# Option 1: Using the startup script
python start.py

# Option 2: Direct uvicorn command
uvicorn app:app --host 0.0.0.0 --port 5000 --reload
\`\`\`

### 5. Frontend Integration

Update your frontend `.env.local`:

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

## API Endpoints

### NDA Generator
- `POST /api/nda/generate` - Generate NDA document

### Clause Explainer  
- `POST /api/explainer/explain` - Explain legal clause

### Clause Comparator
- `POST /api/comparator/compare` - Compare documents

### System
- `GET /health` - Health check
- `GET /` - Root endpoint

## Development

The backend uses:
- **FastAPI** for the web framework
- **SQLAlchemy** for database ORM
- **PostgreSQL** for data storage
- **IBM Granite** for AI processing
- **Transformers** for model integration

## Production Deployment

1. Set up PostgreSQL database
2. Configure environment variables
3. Install dependencies
4. Run with production WSGI server (gunicorn)

\`\`\`bash
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:5000
