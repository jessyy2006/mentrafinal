"use client";

import { useState, useEffect } from 'react';

interface PDFPageImageProps {
  stepNumber: number;
  stepTitle: string;
  className?: string;
}

// Map steps to actual PDF pages
// For LEGO instructions, pages would be different
const STEP_TO_PDF_PAGE: { [key: number]: number } = {
  1: 1,  // Assemble the main body
  2: 2,  // Install the landing gear
  3: 3,  // Assemble the display stand
  4: 4,  // Add the finishing touches
  5: 5,  // Extra step if needed
};

export function PDFPageImage({
  stepNumber,
  stepTitle,
  className = "w-full h-full object-contain"
}: PDFPageImageProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');

  // Default to bookcase PDF, but will be updated from live data
  const defaultPdfUrl = 'https://salsify-ecdn.com/files/e62c7fb40d81f5972267e56bfabeef77.pdf';
  const pageNumber = STEP_TO_PDF_PAGE[stepNumber] || 1;

  useEffect(() => {
    // Fetch the PDF URL from live data
    const fetchPdfUrl = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const response = await fetch('/api/project-data');
        if (response.ok) {
          const data = await response.json();
          const fetchedPdfUrl = data.pdf_url || defaultPdfUrl;
          setPdfUrl(fetchedPdfUrl);
        } else {
          setPdfUrl(defaultPdfUrl);
        }
      } catch (err) {
        console.error('Error fetching PDF URL:', err);
        setPdfUrl(defaultPdfUrl);
      }

      setIsLoading(false);
    };

    fetchPdfUrl();
  }, [stepNumber, pageNumber, defaultPdfUrl]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="animate-pulse">
          <div className="text-sm text-gray-600">Loading step {stepNumber}...</div>
        </div>
      </div>
    );
  }

  // Check if PDF URL is a LEGO PDF - if so, show a placeholder instead
  const isLegoPdf = pdfUrl && pdfUrl.includes('lego.com');

  if (isLegoPdf) {
    // For LEGO, show a placeholder since the PDF is huge
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-8">
        <div className="text-center space-y-4">
          <div className="text-6xl">🧱</div>
          <h3 className="text-xl font-semibold">LEGO Building Instructions</h3>
          <p className="text-gray-600">Step {stepNumber}: {stepTitle}</p>
          <a
            href={`${pdfUrl}#page=${pageNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View Instructions PDF
          </a>
        </div>
      </div>
    );
  }

  // For non-LEGO PDFs, embed the actual PDF
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