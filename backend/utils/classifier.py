# backend/utils/classifier.py
import logging
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

client = genai.Client(api_key=GOOGLE_API_KEY)

logging.basicConfig(level=logging.INFO)

def classify_grievance(grievance: str) -> str:
    department_labels = [
    "Customer Support",
    "Technical Support",
    "Quality Assurance (QA)",
    "Returns, Refunds, and Warranty",
    "Shipping and Logistics"
]

    prompt = f"""
You are a smart grievance classifier. Given the grievance, classify it into one of the 5 departments based on the NER (Named Entity Recognition) and intent classification.
The departments are:
{chr(10).join(f"- {label}" for label in department_labels)}

Grievance:
"{grievance}"

Department (just the name):
"""

    try: 
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=[
                prompt
            ]
        )
        
        if response.text.strip() not in department_labels:
            logging.warning("Gemini returned an unknown department")
            return None

        logging.info(f"Department: {response.text.strip()}")
        return response.text.strip()

    except genai.errors.ApiError as e:
        logging.error(f"Classification failed: {e}")
        return None
