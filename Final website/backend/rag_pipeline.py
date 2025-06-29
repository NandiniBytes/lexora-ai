from langchain.prompts import PromptTemplate
from legal_corpus_loader import get_legal_retriever
from pathlib import Path
import logging
from llm_service import query_model

#configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def run_rag_pipeline(question: str) -> str:
    """
    Runs a Retrieval-Augmented Generation pipeline to answer a legal question.

    Args:
        question(str): The user's legal question

    Returns:
        str: the generated answer
    """

    try:
        #load prompt template
        prompt_path = Path("prompts/rag_qa_prompt.txt")
        if prompt_path.exists():
            with prompt_path.open("r") as file:
                prompt_template = file.read()
        else:
            #default prompt if file not found
            prompt_template = """
            You are a legal expert. Using the provided context, answer the question accurately and concisely.
            Context: {context}
            Question: {question}
            Answer:
            """
            logger.warning("Prompt template not found, using default prompt template")

        #initialize prompt
        prompt = PromptTemplate(
            input_variables=[
                "context",
                "question"
            ],
            template=prompt_template
        )

        #get retriever
        logger.info("Loading legal retriever...")
        retriever = get_legal_retriever()

        #fetch relevant documents
        logger.info("Retrieving relevant documents...")
        docs = retriever.get_relevant_documents(question)
        if not docs:
            logger.warning("No relevant documents found")
            return "No relevant documents found to answer the question"
        
        #combine document content as context
        context = "\n".join([doc.page_content for doc in docs])

        #format the prompt
        formatted_prompt = prompt.format(context=context, question=question)

        #query llm service
        logger.info(f"Processing question: {question}")
        answer = query_model(formatted_prompt)

        #return the answer
        if not answer:
            logger.warning("No answer generated")
            return "No answer could be generated from the provided context"
        
        return answer.strip()
    
    except Exception as e:
        logger.error(f"Error in RAG pipeline: {str(e)}")
        raise
    