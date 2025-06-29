import os
import logging
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

def get_iam_token() -> str:
    """
    Fetch IAM token from IBM Cloud using API key from .env.
    """
    api_key = os.getenv("IBM_API_KEY")
    if not api_key:
        raise ValueError("IBM_API_KEY not found in environment variables")

    response = requests.post(
        "https://iam.cloud.ibm.com/identity/token",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
            "apikey": api_key
        }
    )

    if response.status_code != 200:
        raise Exception(f"Failed to get token: {response.status_code}, {response.text}")

    return response.json()["access_token"]


def query_model(prompt: str) -> dict:
    """
    Query the IBM Watsonx Granite model using plain text prompt format.
    """
    try:
        project_id = os.getenv("IBM_PROJECT_ID")
        model_id = os.getenv("IBM_MODEL_ID", "ibm/granite-3-3-8b-instruct")
        base_url = os.getenv("IBM_GRANITE_URL", "https://us-south.ml.cloud.ibm.com")
        api_version = "2023-05-29"

        if not project_id:
            raise ValueError("IBM_PROJECT_ID missing from .env")

        token = get_iam_token()
        logger.info("✅ Token acquired")

        url = f"{base_url}/ml/v1/text/generation?version={api_version}"

        payload = {
            "project_id": project_id,
            "model_id": model_id,
            "input": prompt,  # 🔄 Correct format for /ml/v1/text/generation
            "parameters": {
                "temperature": 0.3,
                "max_tokens": 1000,
                "top_p": 1
            }
        }

        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}"
        }

        logger.info("📡 Sending request to Watsonx...")
        response = requests.post(url, headers=headers, json=payload)
        logger.info(f"📬 Response status: {response.status_code}")

        if response.status_code != 200:
            logger.error(f"Watsonx error: {response.status_code} - {response.text}")
            return {"explanation": f"Watsonx Error: {response.status_code}", "legal_domain": "Unknown"}

        result = response.json()
        output = result.get("results", [{}])[0].get("generated_text", "")

        if not output:
            logger.warning("⚠️ Empty response from model.")

        return {
            "explanation": output.strip() if output else "No output from model",
            "legal_domain": "General"
        }

    except Exception as e:
        logger.error(f"❌ LLM Service Error: {e}")
        return {"explanation": f"Error: {str(e)}", "legal_domain": "Unknown"}
