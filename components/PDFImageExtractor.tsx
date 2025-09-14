"use client";

import { useState, useEffect } from 'react';

interface PDFImageExtractorProps {
  stepNumber: number;
  stepTitle: string;
  stepDescription: string;
  className?: string;
}

// Map steps to actual PDF pages based on our Gemini analysis
const STEP_TO_PDF_PAGE: { [key: number]: number } = {
  1: 14,  // Assemble side panels - page 14
  2: 23,  // Attach middle shelf - page 23
  3: 15,  // Install back panel - page 15
  4: 19,  // Attach levelers - page 19
  5: 20,  // Secure to wall - page 20
};

// These are the actual extracted images from the PDF
// You need to extract and host these
const EXTRACTED_PDF_IMAGES: { [key: number]: string } = {
  1: "https://hackmit25.s3.amazonaws.com/pdf-images/page-14.jpg",
  2: "https://hackmit25.s3.amazonaws.com/pdf-images/page-23.jpg",
  3: "https://hackmit25.s3.amazonaws.com/pdf-images/page-15.jpg",
  4: "https://hackmit25.s3.amazonaws.com/pdf-images/page-19.jpg",
  5: "https://hackmit25.s3.amazonaws.com/pdf-images/page-20.jpg",
};

export function PDFImageExtractor({
  stepNumber,
  stepTitle,
  stepDescription,
  className = "w-full h-full object-contain"
}: PDFImageExtractorProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [showPDF, setShowPDF] = useState(false);

  const pdfUrl = 'https://salsify-ecdn.com/files/e62c7fb40d81f5972267e56bfabeef77.pdf';
  const pageNumber = STEP_TO_PDF_PAGE[stepNumber] || 1;

  useEffect(() => {
    // First try to use extracted images
    const extractedImage = EXTRACTED_PDF_IMAGES[stepNumber];

    // Check if the extracted image exists
    if (extractedImage) {
      // Try to load the extracted image
      const img = new Image();
      img.onload = () => {
        setImageUrl(extractedImage);
        setIsLoading(false);
      };
      img.onerror = () => {
        // If extracted image doesn't exist, show PDF viewer
        setShowPDF(true);
        setIsLoading(false);
      };
      img.src = extractedImage;
    } else {
      // No extracted image, show PDF
      setShowPDF(true);
      setIsLoading(false);
    }
  }, [stepNumber]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="animate-pulse">
          <div className="text-sm text-gray-600">Loading instructions...</div>
        </div>
      </div>
    );
  }

  // If we have an extracted image, show it
  if (imageUrl && !showPDF) {
    return (
      <img
        src={imageUrl}
        alt={`Step ${stepNumber}: ${stepTitle}`}
        className={className}
        onError={() => {
          // If image fails, fallback to PDF viewer
          setShowPDF(true);
          setImageUrl('');
        }}
      />
    );
  }

  // Show PDF in iframe as fallback
  return (
    <div className="w-full h-full relative">
      <iframe
        src={`${pdfUrl}#page=${pageNumber}`}
        className="w-full h-full min-h-[500px]"
        title={`Step ${stepNumber}: ${stepTitle}`}
      />
      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
        Page {pageNumber}
      </div>
    </div>
  );
}