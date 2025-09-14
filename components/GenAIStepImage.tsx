"use client";

import { useState, useEffect } from 'react';
import { getGenAIService } from '@/lib/genai-image-generator';
import Image from 'next/image';

interface GenAIStepImageProps {
  stepNumber: number;
  stepTitle: string;
  stepDescription: string;
  materials?: string[];
  tools?: string[];
  className?: string;
}

export function GenAIStepImage({
  stepNumber,
  stepTitle,
  stepDescription,
  materials,
  tools,
  className = "w-full h-full object-cover"
}: GenAIStepImageProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateImage = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const genAIService = getGenAIService();

        // Generate image URL using GenAI
        const generatedUrl = await genAIService.generateStepImageURL({
          stepNumber,
          stepTitle,
          stepDescription,
          materials,
          tools
        });

        setImageUrl(generatedUrl);
      } catch (err) {
        console.error('Error generating image with GenAI:', err);
        setError('Failed to generate image');
        // Use a fallback image
        setImageUrl(`https://via.placeholder.com/800x600?text=Step+${stepNumber}:+${encodeURIComponent(stepTitle)}`);
      } finally {
        setIsLoading(false);
      }
    };

    generateImage();
  }, [stepNumber, stepTitle, stepDescription, materials, tools]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Generating with AI...</p>
        </div>
      </div>
    );
  }

  if (error && !imageUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <img
        src={imageUrl}
        alt={`Step ${stepNumber}: ${stepTitle}`}
        className={className}
        onError={(e) => {
          // If image fails to load, try a fallback
          const target = e.target as HTMLImageElement;
          target.src = `https://via.placeholder.com/800x600?text=Step+${stepNumber}`;
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
        <p className="text-white text-xs">AI Generated</p>
      </div>
    </div>
  );
}