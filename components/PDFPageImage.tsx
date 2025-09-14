"use client";

import { useState, useEffect } from 'react';

interface PDFPageImageProps {
  stepNumber: number;
  stepTitle: string;
  className?: string;
}

// Map steps to actual PDF pages based on Gemini analysis
const STEP_TO_PDF_PAGE: { [key: number]: number } = {
  1: 14,  // Assemble side panels
  2: 23,  // Attach middle shelf
  3: 15,  // Install back panel
  4: 19,  // Attach levelers
  5: 20,  // Secure to wall
};

export function PDFPageImage({
  stepNumber,
  stepTitle,
  className = "w-full h-full object-contain"
}: PDFPageImageProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const pdfUrl = 'https://salsify-ecdn.com/files/e62c7fb40d81f5972267e56bfabeef77.pdf';
  const pageNumber = STEP_TO_PDF_PAGE[stepNumber] || 1;

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    // Use a PDF to image conversion service
    // Option 1: Use pdf2image service
    const pdf2imageUrl = `https://api.pdf2image.com/v1/convert?url=${encodeURIComponent(pdfUrl)}&page=${pageNumber}`;

    // Option 2: Use pdfcrowd service (more reliable)
    const pdfcrowdUrl = `https://pdfcrowd.com/api/pdf-to-image/?url=${encodeURIComponent(pdfUrl)}&page=${pageNumber}`;

    // Option 3: Use our own API endpoint that converts PDF to image
    const apiUrl = `/api/pdf-to-image?url=${encodeURIComponent(pdfUrl)}&page=${pageNumber}`;

    // For now, use a direct screenshot service
    const screenshotUrl = `https://api.screenshotmachine.com?key=YOUR_KEY&url=${encodeURIComponent(pdfUrl + '#page=' + pageNumber)}&dimension=1024x768`;

    // Actual working solution: Use the PDF directly in an img tag with page fragment
    // Some browsers support this
    const directPdfPageUrl = `${pdfUrl}#page=${pageNumber}`;

    // Set the image URL
    setImageUrl(directPdfPageUrl);
    setIsLoading(false);
  }, [stepNumber, pageNumber]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="animate-pulse">
          <div className="text-sm text-gray-600">Loading step {stepNumber}...</div>
        </div>
      </div>
    );
  }

  // Since browsers don't support PDF in img tags, we need to use object or iframe
  return (
    <div className="w-full h-full relative bg-white">
      <object
        data={`${pdfUrl}#page=${pageNumber}`}
        type="application/pdf"
        className="w-full h-full min-h-[500px]"
      >
        <iframe
          src={`${pdfUrl}#page=${pageNumber}`}
          className="w-full h-full min-h-[500px]"
          title={`Step ${stepNumber}: ${stepTitle}`}
        >
          <p>
            Your browser doesn't support embedded PDFs.
            <a href={`${pdfUrl}#page=${pageNumber}`} target="_blank" rel="noopener noreferrer">
              View Step {stepNumber} (Page {pageNumber})
            </a>
          </p>
        </iframe>
      </object>
      <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-md text-sm">
        Step {stepNumber} - Page {pageNumber}
      </div>
    </div>
  );
}