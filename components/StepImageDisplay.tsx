"use client";

interface StepImageDisplayProps {
  stepNumber: number;
  stepTitle: string;
  fallbackUrl?: string;
  className?: string;
}

// These are the actual page screenshots from the PDF
// You would need to extract these from the PDF and host them
const STEP_IMAGES: { [key: number]: string } = {
  1: "https://hackmit25.s3.amazonaws.com/bookcase-step-1.jpg", // Page showing side panel assembly
  2: "https://hackmit25.s3.amazonaws.com/bookcase-step-2.jpg", // Page showing middle shelf
  3: "https://hackmit25.s3.amazonaws.com/bookcase-step-3.jpg", // Page showing back panel
  4: "https://hackmit25.s3.amazonaws.com/bookcase-step-4.jpg", // Page showing levelers
  5: "https://hackmit25.s3.amazonaws.com/bookcase-step-5.jpg", // Page showing wall mounting
};

export function StepImageDisplay({
  stepNumber,
  stepTitle,
  fallbackUrl,
  className = "w-full h-full object-cover"
}: StepImageDisplayProps) {
  // Use the mapped image or fallback
  const imageUrl = STEP_IMAGES[stepNumber] || fallbackUrl || `https://via.placeholder.com/800x600?text=Step+${stepNumber}`;

  return (
    <img
      src={imageUrl}
      alt={`Step ${stepNumber}: ${stepTitle}`}
      className={className}
      onError={(e) => {
        // If the image fails to load, use the fallback
        if (fallbackUrl && e.currentTarget.src !== fallbackUrl) {
          e.currentTarget.src = fallbackUrl;
        }
      }}
    />
  );
}