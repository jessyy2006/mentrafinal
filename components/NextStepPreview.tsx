import { Step } from '../types/project';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface NextStepPreviewProps {
  nextStep: Step | null;
}

export function NextStepPreview({ nextStep }: NextStepPreviewProps) {
  if (!nextStep) return null;

  return (
    null
  );
}