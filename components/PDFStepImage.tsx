"use client";

import { useState, useEffect } from 'react';
import { getPDFExtractor } from '@/lib/gemini-pdf-extractor';

interface PDFStepImageProps {
  stepNumber: number;
  stepTitle: string;
  stepDescription: string;
  fallbackUrl?: string;
  className?: string;
}

export function PDFStepImage({
  stepNumber,
  stepTitle,
  stepDescription,
  fallbackUrl,
  className = "w-full h-full object-cover"
}: PDFStepImageProps) {
  const [imageUrl, setImageUrl] = useState<string>(
    fallbackUrl || `https://via.placeholder.com/800x600?text=Loading+Step+${stepNumber}`
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStepImage = async () => {
      try {
        setIsLoading(true);
        const extractor = getPDFExtractor();
        const imageData = await extractor.extractStepImage(
          stepNumber,
          stepTitle,
          stepDescription
        );
        setImageUrl(imageData.imageUrl);
        setError(null);
      } catch (err) {
        console.error('Error loading step image:', err);
        setError('Failed to load step image');
        if (fallbackUrl) {
          setImageUrl(fallbackUrl);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadStepImage();
  }, [stepNumber, stepTitle, stepDescription, fallbackUrl]);

  if (error && !fallbackUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Unable to load image</p>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      )}
      <img
        src={imageUrl}
        alt={stepTitle}
        className={className}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError('Image failed to load');
          if (fallbackUrl && imageUrl !== fallbackUrl) {
            setImageUrl(fallbackUrl);
          }
        }}
      />
    </>
  );
}