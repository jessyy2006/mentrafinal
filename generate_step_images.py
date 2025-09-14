#!/usr/bin/env python3
"""
Generate step image URLs based on the PDF pages identified by Gemini
"""

import json

# Page mapping from Gemini analysis
PAGE_MAPPING = {
    1: 14,  # Assemble side panels
    2: 23,  # Attach middle shelf
    3: 15,  # Install back panel
    4: 19,  # Stand up bookcase
    5: 20,  # Secure to wall
}

# PDF URL
PDF_URL = "https://salsify-ecdn.com/files/e62c7fb40d81f5972267e56bfabeef77.pdf"

def generate_pdf_viewer_urls():
    """Generate URLs to view specific PDF pages"""

    urls = {}

    for step_num, page_num in PAGE_MAPPING.items():
        # Create a direct link to the PDF page
        # This will open the PDF at the specific page in most browsers
        direct_url = f"{PDF_URL}#page={page_num}"

        # Alternative: Use PDF.js viewer (more reliable for embedding)
        pdfjs_url = f"https://mozilla.github.io/pdf.js/web/viewer.html?file={PDF_URL}#page={page_num}"

        # Alternative: Google Docs viewer
        google_url = f"https://docs.google.com/viewer?url={PDF_URL}&embedded=true#:0.page.{page_num}"

        urls[step_num] = {
            "direct": direct_url,
            "pdfjs": pdfjs_url,
            "google": google_url,
            "page": page_num
        }

    return urls

def update_component_with_urls():
    """Generate the updated StepImageDisplay component"""

    urls = generate_pdf_viewer_urls()

    print("Update your StepImageDisplay.tsx with these URLs:")
    print("=" * 60)
    print()
    print("const STEP_IMAGES: { [key: number]: string } = {")

    for step_num in sorted(urls.keys()):
        # Use the PDF.js viewer for best compatibility
        url = urls[step_num]["pdfjs"]
        print(f'  {step_num}: "{url}",')

    print("};")
    print()
    print("=" * 60)
    print()
    print("For now, these URLs will open the PDF at the correct page.")
    print("To get actual images:")
    print("1. Screenshot each page from the PDF")
    print("2. Upload to S3 as bookcase-step-1.jpg through bookcase-step-5.jpg")
    print("3. Update the URLs in StepImageDisplay.tsx")

if __name__ == "__main__":
    urls = generate_pdf_viewer_urls()

    # Save URLs to file
    with open("pdf_page_urls.json", "w") as f:
        json.dump(urls, f, indent=2)

    print("PDF page URLs saved to pdf_page_urls.json")
    print()
    update_component_with_urls()