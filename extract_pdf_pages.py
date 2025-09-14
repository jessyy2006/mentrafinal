#!/usr/bin/env python3
"""
Extract specific pages from PDF as images based on Gemini analysis
"""

import os
import json
from pdf2image import convert_from_path
import requests

# Page mapping from Gemini analysis
PAGE_MAPPING = {
    1: 14,  # Assemble side panels
    2: 23,  # Attach middle shelf
    3: 15,  # Install back panel
    4: 19,  # Stand up bookcase
    5: 20,  # Secure to wall
}

def extract_pages_as_images():
    """Extract specific pages from PDF as images"""

    pdf_path = "bookcase_assembly.pdf"

    # Check if PDF exists, if not download it
    if not os.path.exists(pdf_path):
        print("Downloading PDF...")
        response = requests.get("https://salsify-ecdn.com/files/e62c7fb40d81f5972267e56bfabeef77.pdf")
        with open(pdf_path, 'wb') as f:
            f.write(response.content)

    # Create output directory
    os.makedirs("extracted_images", exist_ok=True)

    print("Converting PDF pages to images...")
    print("Note: This requires poppler-utils to be installed")
    print("On Mac: brew install poppler")
    print("On Ubuntu: sudo apt-get install poppler-utils")
    print("")

    try:
        # Convert all pages (we'll select specific ones)
        pages = convert_from_path(pdf_path, dpi=150)

        # Extract specific pages for each step
        for step_num, page_num in PAGE_MAPPING.items():
            if page_num <= len(pages):
                # Page numbers are 1-indexed, but list is 0-indexed
                page_image = pages[page_num - 1]

                # Save as JPG
                output_path = f"extracted_images/bookcase-step-{step_num}.jpg"
                page_image.save(output_path, 'JPEG', quality=90)
                print(f"Step {step_num}: Extracted page {page_num} -> {output_path}")
            else:
                print(f"Warning: Page {page_num} not found in PDF")

        print("\n✅ Images extracted successfully!")
        print("\nNext steps:")
        print("1. Upload these images to S3:")
        for step in range(1, 6):
            print(f"   - extracted_images/bookcase-step-{step}.jpg -> https://hackmit25.s3.amazonaws.com/bookcase-step-{step}.jpg")
        print("2. The app will automatically use these images")

    except Exception as e:
        print(f"Error: {e}")
        print("\nAlternative: Use an online PDF to image converter:")
        print("1. Go to https://www.ilovepdf.com/pdf_to_jpg")
        print("2. Upload the PDF")
        print("3. Extract these pages:", list(PAGE_MAPPING.values()))
        print("4. Save as bookcase-step-1.jpg through bookcase-step-5.jpg")

if __name__ == "__main__":
    extract_pages_as_images()