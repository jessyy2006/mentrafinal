#!/usr/bin/env python3
"""
Extract relevant PDF sections for each assembly step using Gemini API
"""

from google import genai
import json
import base64
from pathlib import Path
import requests

# Initialize Gemini client
client = genai.Client()

def extract_pdf_section(pdf_path, step_number, step_title, step_description):
    """
    Use Gemini to identify and extract the relevant section of a PDF
    that corresponds to a specific assembly step
    """

    # Read the PDF file
    with open(pdf_path, 'rb') as pdf_file:
        pdf_content = pdf_file.read()
        pdf_base64 = base64.b64encode(pdf_content).decode('utf-8')

    # Create prompt for Gemini to identify the relevant section
    prompt = f"""
    You are analyzing an assembly instruction PDF.
    Please identify the page or section that shows:

    Step {step_number}: {step_title}
    Description: {step_description}

    Extract the visual content that corresponds to this specific step.
    Focus on diagrams, illustrations, or images that show how to perform this step.

    Return the page number and coordinates of the relevant section.
    """

    # Generate response using Gemini
    response = client.models.generate_content(
        model="gemini-2.0-flash-exp",
        contents=[
            {
                "parts": [
                    {"text": prompt},
                    {
                        "inline_data": {
                            "mime_type": "application/pdf",
                            "data": pdf_base64
                        }
                    }
                ]
            }
        ]
    )

    return response.text

def update_project_images(pdf_path, json_url):
    """
    Update project.ts with extracted PDF images for each step
    """

    # Fetch the project data from S3
    response = requests.get(json_url)
    project_data = response.json()

    # Process each step
    extracted_images = []
    for step in project_data['project']['steps']:
        step_id = step['id']
        step_title = step['title']
        step_description = step['description']

        print(f"Processing Step {step_id}: {step_title}")

        # Extract relevant PDF section for this step
        section_info = extract_pdf_section(
            pdf_path,
            step_id,
            step_title,
            step_description
        )

        # Store the extracted image URL or base64 data
        # For now, we'll use placeholder URLs that would be replaced with actual extracted images
        image_url = f"https://hackmit25.s3.amazonaws.com/projects/492490502940-step-{step_id}-extracted.jpg"

        extracted_images.append({
            "step": step_id,
            "title": step_title,
            "image_url": image_url,
            "extraction_info": section_info
        })

    return extracted_images

def main():
    # Configuration
    PDF_PATH = "/path/to/assembly_instructions.pdf"  # Update with actual PDF path
    JSON_URL = "https://hackmit25.s3.us-east-1.amazonaws.com/informationlive.json"

    # Check if PDF exists
    if not Path(PDF_PATH).exists():
        print(f"PDF not found at {PDF_PATH}")
        print("Please update PDF_PATH with the actual path to your assembly instructions PDF")
        return

    # Extract images for each step
    extracted_images = update_project_images(PDF_PATH, JSON_URL)

    # Save results
    with open('extracted_images.json', 'w') as f:
        json.dump(extracted_images, f, indent=2)

    print("Extraction complete! Results saved to extracted_images.json")

    # Generate TypeScript update for project.ts
    print("\nUpdate project.ts with these image URLs:")
    for img_info in extracted_images:
        print(f"Step {img_info['step']}: {img_info['image_url']}")

if __name__ == "__main__":
    main()