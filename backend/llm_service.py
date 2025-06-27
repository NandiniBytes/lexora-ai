from transformers import pipeline
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def query_model(prompt: str) -> str:
    """
    Queries the IBM Granite model with a given prompt and returns the generated text.
    
    Args:
        prompt (str): Input prompt for the model
        
    Returns:
        str: Generated text from the model
    """
    try:
        # Initialize the pipeline
        logger.info("Initializing text-generation pipeline...")
        pipe = pipeline(
            task="text-generation",
            model="ibm-granite/granite-13b-instruct",
            model_kwargs={
                "do_sample": False,
                "temperature": 0.0,
                "max_new_tokens": 400
            },
            device=-1  # CPU
        )
        
        # Generate text
        logger.info("Generating text from prompt...")
        output = pipe(prompt)[0]["generated_text"]
        
        # Clean and return the output
        cleaned_output = output.strip()
        return cleaned_output
    
    except Exception as e:
        logger.error(f"Error querying model: {str(e)}")
        raise