from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.nda_generator import router as nda_router
from routes.clause_explainer import router as explainer_router
from routes.clause_comparator import router as comparator_router
import uvicorn

#initialize the fastapi app
app = FastAPI(title="Lexora backend")

#configure CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#include routers
app.include_router(nda_router, prefix="/api/nda")
app.include_router(explainer_router, prefix="/api/explainer")
app.include_router(comparator_router, prefix="/api/comparator")

# root route
@app.get("/")
async def root():
    return{
        "message": "Lexora backend is running"
    }

#run server
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)