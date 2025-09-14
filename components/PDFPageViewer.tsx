"use client";

import { useState, useEffect } from 'react';

interface PDFPageViewerProps {
  stepNumber: number;
  stepTitle: string;
  className?: string;
}

// Map step numbers to PDF pages based on the actual PDF content
const STEP_TO_PAGE_MAP: { [key: number]: number } = {
  1: 2,  // Step 1 is likely on page 2 of the PDF
  2: 3,  // Step 2 on page 3
  3: 4,  // Step 3 on page 4
  4: 5,  // Step 4 on page 5
  5: 6,  // Step 5 on page 6
};

export function PDFPageViewer({
  stepNumber,
  stepTitle,
  className = "w-full h-full"
}: PDFPageViewerProps) {
  const pdfUrl = 'https://salsify-ecdn.com/files/e62c7fb40d81f5972267e56bfabeef77.pdf';
  const pageNumber = STEP_TO_PAGE_MAP[stepNumber] || stepNumber + 1;

  // Use Google Docs viewer as a fallback for PDF rendering
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true#:~:text=Step%20${stepNumber}`;

  // Alternative: Direct PDF embed with page fragment
  const directPdfUrl = `${pdfUrl}#page=${pageNumber}`;

  return (
    <div className={className}>
      {/* Try to embed the PDF directly */}
      <object
        data={directPdfUrl}
        type="application/pdf"
        className="w-full h-full min-h-[400px]"
      >
        {/* Fallback to iframe if object doesn't work */}
        <iframe
          src={viewerUrl}
          className="w-full h-full min-h-[400px]"
          title={`Step ${stepNumber}: ${stepTitle}`}
        >
          {/* Final fallback: link to PDF */}
          <p>
            Unable to display PDF.{' '}
            <a
              href={directPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Step {stepNumber} in PDF
            </a>
          </p>
        </iframe>
      </object>
    </div>
  );
}