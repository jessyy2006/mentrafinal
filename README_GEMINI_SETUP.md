# Gemini PDF Extraction Setup

This app uses Google's Gemini API to extract relevant sections from assembly instruction PDFs.

## Setup Instructions

1. **Get a Gemini API Key**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key

2. **Configure Environment Variables**
   - Open `.env.local`
   - Replace `your_gemini_api_key_here` with your actual API key
   - Update `NEXT_PUBLIC_PDF_URL` if you have a different PDF source

3. **PDF Requirements**
   - The PDF should contain assembly instructions with clear step-by-step visuals
   - Each step should have diagrams or images showing the assembly process
   - The Gemini API will analyze the PDF and extract the relevant section for each step

## How It Works

1. When a step is displayed, the `PDFStepImage` component makes a request to extract the relevant PDF section
2. The Gemini API analyzes the PDF content and identifies the page/section matching the step
3. The extracted image is displayed in place of the placeholder
4. If extraction fails, it falls back to the default image URL

## Python Script Usage (Optional)

If you want to pre-extract all images:

```bash
# Install dependencies
pip install google-generativeai requests

# Update the PDF_PATH in extract_pdf_images.py
python extract_pdf_images.py
```

This will generate extracted images for all steps and save them for later use.