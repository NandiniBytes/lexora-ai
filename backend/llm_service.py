from transformers import AutoModelForCausalLM, AutoTokenizer, set_seed
import torch
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def query_model(prompt: str) -> str:
    """
    Queries the IBM Granite 3.3-8B-Instruct model with a prompt and returns generated text.
    """
    try:
        model_id = "ibm/granite-3.3-8b-instruct"
        device = "cuda" if torch.cuda.is_available() else "cpu"
        logger.info(f"Using device: {device}")

        # Load model and tokenizer
        logger.info("Loading Granite model and tokenizer...")
        tokenizer = AutoTokenizer.from_pretrained(model_id)
        model = AutoModelForCausalLM.from_pretrained(model_id, torch_dtype=torch.bfloat16)
        model.to(device)

        # Tokenize the prompt
        inputs = tokenizer(prompt, return_tensors="pt").to(device)

        # Generate response
        logger.info("Generating output...")
        set_seed(42)
        outputs = model.generate(
            **inputs,
            max_new_tokens=400,
            do_sample=False,
            temperature=0.0,
        )

        # Decode output
        response = tokenizer.decode(
            outputs[0], skip_special_tokens=True
        ).strip()

        return response

    except Exception as e:
        logger.error(f"Error querying model: {str(e)}")
        return "Error generating output"
