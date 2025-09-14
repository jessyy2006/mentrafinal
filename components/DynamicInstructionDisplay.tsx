"use client";

import { useState, useEffect } from 'react';

interface DynamicInstructionDisplayProps {
  stepNumber: number;
  stepTitle: string;
  stepDescription: string;
  pdfUrl?: string;
  imageUrl?: string;
  className?: string;
}

export function DynamicInstructionDisplay({
  stepNumber,
  stepTitle,
  stepDescription,
  pdfUrl,
  imageUrl,
  className = "w-full h-full"
}: DynamicInstructionDisplayProps) {
  const [displayUrl, setDisplayUrl] = useState<string>('');
  const [displayType, setDisplayType] = useState<'pdf' | 'image' | 'placeholder'>('placeholder');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const determineDisplay = async () => {
      setIsLoading(true);

      // Check what we have available
      if (imageUrl && imageUrl.includes('.jpg') || imageUrl?.includes('.png')) {
        // We have a direct image URL
        setDisplayUrl(imageUrl);
        setDisplayType('image');
      } else if (pdfUrl) {
        // We have a PDF URL
        setDisplayUrl(pdfUrl);
        setDisplayType('pdf');
      } else {
        // No resources available, show placeholder
        setDisplayType('placeholder');
      }

      setIsLoading(false);
    };

    determineDisplay();
  }, [imageUrl, pdfUrl]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Display based on type
  switch (displayType) {
    case 'image':
      return (
        <img
          src={displayUrl}
          alt={`Step ${stepNumber}: ${stepTitle}`}
          className={className + " object-contain"}
        />
      );

    case 'pdf':
      // Check if it's a complex PDF (like LEGO)
      const isComplexPDF = displayUrl.includes('lego.com') || displayUrl.includes('.pdf');

      if (isComplexPDF) {
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-8">
            <div className="text-center space-y-4">
              <div className="text-5xl mb-4">📄</div>
              <h3 className="text-lg font-semibold">Step {stepNumber}</h3>
              <p className="text-gray-600">{stepTitle}</p>
              <p className="text-sm text-gray-500">{stepDescription}</p>
              <a
                href={displayUrl}
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

      // Try to embed simpler PDFs
      return (
        <object
          data={displayUrl}
          type="application/pdf"
          className="w-full h-full min-h-[500px]"
        >
          <iframe
            src={displayUrl}
            className="w-full h-full min-h-[500px]"
            title={`Step ${stepNumber}: ${stepTitle}`}
          />
        </object>
      );

    case 'placeholder':
    default:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 p-8">
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold">Step {stepNumber}</h3>
            <p className="text-lg">{stepTitle}</p>
            <p className="text-gray-600 max-w-md">{stepDescription}</p>
          </div>
        </div>
      );
  }
}