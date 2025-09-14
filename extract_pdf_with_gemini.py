#!/usr/bin/env python3
"""
Extract images from PDF using Google Generative AI (Gemini)
"""

import google.generativeai as genai
import requests
import json
import base64
from pathlib import Path
import os

# Configure Gemini
GEMINI_API_KEY = "AIzaSyB6R-SNmKTGTkD640Pb37Uqd1O2QzeVmRU"
genai.configure(api_key=GEMINI_API_KEY)

# PDF URL
PDF_URL = "https://salsify-ecdn.com/files/e62c7fb40d81f5972267e56bfabeef77.pdf"

# S3 project data
PROJECT_DATA_URL = "https://hackmit25.s3.amazonaws.com/projects/492490502940-1757823796974.json"

def download_pdf():
    """Download the PDF file"""
    print(f"Downloading PDF from {PDF_URL}...")
    response = requests.get(PDF_URL)
    pdf_path = "bookcase_assembly.pdf"
    with open(pdf_path, 'wb') as f:
        f.write(response.content)
    print(f"PDF saved to {pdf_path}")
    return pdf_path

def get_project_steps():
    """Fetch project steps from S3"""
    print(f"Fetching project data from {PROJECT_DATA_URL}...")
    response = requests.get(PROJECT_DATA_URL)
    data = response.json()
    return data['project']['steps']

def extract_step_image_with_gemini(pdf_path, step_info):
    """Use Gemini to analyze and extract the relevant section for a step"""

    # Read PDF file
    with open(pdf_path, 'rb') as f:
        pdf_data = f.read()

    # Create the model
    model = genai.GenerativeModel('gemini-1.5-flash')

    # Create prompt
    prompt = f"""
    I have a furniture assembly PDF. Please analyze it and find the page that shows:

    Step {step_info['id']}: {step_info['title']}
    Description: {step_info['description']}

    The step involves these details:
    {chr(10).join('- ' + detail for detail in step_info.get('details', []))}

    Please identify:
    1. Which page number contains the visual instructions for this step
    2. Describe what the diagram shows
    3. Any important visual details that would help someone complete this step

    Return your response in this format:
    Page: [page number]
    Description: [what the diagram shows]
    Key details: [important visual elements]
    """

    # Upload the PDF to Gemini
    pdf_file = genai.upload_file(pdf_path, mime_type="application/pdf")

    # Generate response
    response = model.generate_content([prompt, pdf_file])

    print(f"\nStep {step_info['id']} - {step_info['title']}:")
    print(response.text)

    # Clean up uploaded file
    genai.delete_file(pdf_file.name)

    return response.text

def main():
    # Download PDF
    pdf_path = download_pdf()

    # Get project steps
    steps = get_project_steps()

    print(f"\nFound {len(steps)} steps to process\n")
    print("=" * 60)

    # Process each step
    results = []
    for step in steps:
        try:
            result = extract_step_image_with_gemini(pdf_path, step)
            results.append({
                'step': step['id'],
                'title': step['title'],
                'gemini_analysis': result
            })
        except Exception as e:
            print(f"Error processing step {step['id']}: {e}")

    # Save results
    with open('gemini_pdf_analysis.json', 'w') as f:
        json.dump(results, f, indent=2)

    print("\n" + "=" * 60)
    print("Analysis complete! Results saved to gemini_pdf_analysis.json")
    print("\nNext steps:")
    print("1. Based on the page numbers identified, extract those pages as images")
    print("2. Upload the images to S3 with names like bookcase-step-1.jpg")
    print("3. Update the StepImageDisplay component with the actual S3 URLs")

if __name__ == "__main__":
    main()