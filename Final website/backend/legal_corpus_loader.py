from langchain.document_loaders import DirectoryLoader, TextLoader, PyMuPDFLoader, Docx2txtLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from pathlib import Path
import logging

#configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_legal_retriever():
    """
    Loads legal documents, splits them into chunks, embeds them and returns a FAISS retriever.

    Returns:
        FAISS retriever object for querying legal documents
    """
    try:
        #define directory for legal documents
        docs_path = Path("data/legal_docs/")
        if not docs_path.exists():
            logger.error("Legal documents directory not found")
            raise FileNotFoundError("Legal documents directory not found")
        
        #initialize document loader with support for .txt and .pdf and .docx files
        loader = DirectoryLoader(
            path=docs_path,
            glob="**/*.{txt,pdf,docx}",
            loader_cls=lambda path: (
                PyMuPDFLoader(path) if path.endswith('.pdf') else
                Docx2txtLoader(path) if path.endswith('.docx') else
                TextLoader(path)
            ),
            show_progress=True
        )
        
        #load documents
        logger.info("Loading legal documents...")
        documents = loader.load()
        if not documents:
            logger.error("No documents loaded")
            raise ValueError("No legal documents found in the directory")
        
        #initialize text splitter
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len
        )

        #split docs into chunks
        logger.info("Splitting documents into chunks...")
        chunks = text_splitter.split_documents(documents)

        # initialize embeddings
        logger.info("Initializing embeddings...")
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2",
            model_kwargs={'device': 'cpu'}
        )

        #create FAISS vectorstore
        logger.info("Creating FAISS vectorstore...")
        vectorstore = FAISS.from_documents(chunks, embeddings)

        #return retriever
        logger.info("Returning FAISS retriever")
        return vectorstore.as_retriever()
    
    except Exception as e:
        logger.error(f"Error in get_legal_retriever: {str(e)}")
        raise