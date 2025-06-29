import logging
from pathlib import Path
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from backend.llm_service import query_model

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def run_rag_pipeline(question: str) -> str:
    """
    Runs a Retrieval-Augmented Generation pipeline to answer a legal question.

    Args:
        question (str): The user's legal question

    Returns:
        str: the generated answer
    """
    try:
        # Load FAISS index
        logger.info("📂 Loading FAISS retriever from saved index...")
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2",
            model_kwargs={'device': 'cpu'}
        )
        vectorstore = FAISS.load_local("faiss_index", embeddings, allow_dangerous_deserialization=True)
        retriever = vectorstore.as_retriever()

        # Retrieve documents
        logger.info("🔍 Retrieving relevant documents...")
        docs = retriever.get_relevant_documents(question)
        if not docs:
            logger.warning("⚠️ No relevant documents found")
            return "No relevant documents found to answer the question."

        # Format context
        context = "\n".join([doc.page_content for doc in docs])

        # Build prompt for text completion
        prompt = (
            "You are a legal expert. Use the following legal context to answer the user's question clearly and concisely.\n\n"
            f"Context:\n{context}\n\n"
            f"Question: {question}\nAnswer:"
        )

        # Query LLM
        logger.info("🤖 Querying LLM with full prompt...")
        response = query_model(prompt)

        # Ensure correct response structure
        if not isinstance(response, dict) or "explanation" not in response:
            logger.warning("⚠️ LLM did not return expected format")
            return "Unexpected response from the model."

        return response["explanation"].strip()

    except Exception as e:
        logger.error(f"❌ Error in RAG pipeline: {str(e)}")
        return f"Error in RAG pipeline: {str(e)}"

if __name__ == "__main__":
    question = "What are the key clauses in an NDA agreement?"
    print("🤖 Asking:", question)
    answer = run_rag_pipeline(question)
    print("\n📜 RAG Response:\n", answer)
