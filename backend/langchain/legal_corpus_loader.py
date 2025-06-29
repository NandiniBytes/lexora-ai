from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import TextLoader, PyMuPDFLoader, Docx2txtLoader
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_legal_retriever():
    try:
        docs_path = Path("D:/lexora-ai/data/legal_docs")
        if not docs_path.exists():
            logger.error("Legal documents directory not found")
            raise FileNotFoundError("Legal documents directory not found")
        
        logger.info("Loading legal documents...")
        documents = []
        for file_path in docs_path.rglob("*"):
            if file_path.suffix == ".pdf":
                loader = PyMuPDFLoader(str(file_path))
            elif file_path.suffix == ".docx":
                loader = Docx2txtLoader(str(file_path))
            elif file_path.suffix == ".txt":
                loader = TextLoader(str(file_path), encoding="utf-8")

            else:
                continue
            documents.extend(loader.load())

        if not documents:
            logger.error("No documents loaded")
            raise ValueError("No legal documents found in the directory")

        logger.info("Splitting documents into chunks...")
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )
        chunks = text_splitter.split_documents(documents)

        logger.info("Initializing embeddings...")
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2",
            model_kwargs={'device': 'cpu'}
        )

        logger.info("Creating FAISS vectorstore...")
        vectorstore = FAISS.from_documents(chunks, embeddings)

        logger.info("Returning FAISS retriever")
        return vectorstore.as_retriever()
    
    except Exception as e:
        logger.error(f"Error in get_legal_retriever: {str(e)}")
        raise

if __name__ == "__main__":
    logger.info("🔧 Building FAISS vectorstore from legal documents...")
    retriever = get_legal_retriever()
    retriever.vectorstore.save_local("faiss_index")
    logger.info("✅ FAISS index saved to 'faiss_index'")
