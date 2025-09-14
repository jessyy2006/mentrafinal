/**
 * Google Generative AI Image Generator for assembly steps
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyB6R-SNmKTGTkD640Pb37Uqd1O2QzeVmRU');

export interface StepImageRequest {
  stepNumber: number;
  stepTitle: string;
  stepDescription: string;
  materials?: string[];
  tools?: string[];
}

export class GenAIImageService {
  private model;

  constructor() {
    // Use gemini-1.5-flash for fast responses
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  /**
   * Generate an image URL for a specific assembly step
   * Since Gemini doesn't generate images directly, we'll use it to analyze
   * and extract relevant content from the PDF
   */
  async generateStepImageURL(request: StepImageRequest): Promise<string> {
    try {
      // Generate a prompt for the step
      const prompt = `
        Create a detailed description for an assembly instruction diagram showing:
        Step ${request.stepNumber}: ${request.stepTitle}
        Description: ${request.stepDescription}
        Materials needed: ${request.materials?.join(', ') || 'Various parts'}
        Tools required: ${request.tools?.join(', ') || 'Basic tools'}

        Describe what the visual diagram should show for this assembly step.
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Log the AI's understanding of the step
      console.log(`GenAI analysis for Step ${request.stepNumber}:`, text);

      // For now, return a generated image URL based on the step
      // In production, this would connect to an image generation service
      return this.getGeneratedImageURL(request.stepNumber, text);
    } catch (error) {
      console.error('Error generating image with GenAI:', error);
      return this.getFallbackImageURL(request.stepNumber);
    }
  }

  /**
   * Get the URL for a generated image
   * This would connect to your image generation/storage service
   */
  private getGeneratedImageURL(stepNumber: number, description: string): string {
    // These URLs should point to your actual generated images
    // For now, using placeholder that includes step info
    const baseUrl = 'https://hackmit25.s3.amazonaws.com/genai-images';
    return `${baseUrl}/step-${stepNumber}-generated.jpg`;
  }

  /**
   * Get a fallback image URL if generation fails
   */
  private getFallbackImageURL(stepNumber: number): string {
    return `https://via.placeholder.com/800x600?text=Step+${stepNumber}`;
  }

  /**
   * Analyze PDF and extract image for a step
   */
  async extractStepFromPDF(
    pdfUrl: string,
    stepNumber: number,
    stepTitle: string
  ): Promise<string> {
    try {
      const prompt = `
        Analyze this furniture assembly PDF and identify the visual instructions for:
        Step ${stepNumber}: ${stepTitle}

        Describe what the diagram shows and which page it appears on.
      `;

      // Note: For actual PDF analysis, you'd need to upload the PDF to Gemini
      // This is a simplified version
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const analysisText = response.text();

      console.log(`PDF analysis for Step ${stepNumber}:`, analysisText);

      // Return the appropriate image URL based on analysis
      return this.getGeneratedImageURL(stepNumber, analysisText);
    } catch (error) {
      console.error('Error analyzing PDF with GenAI:', error);
      return this.getFallbackImageURL(stepNumber);
    }
  }
}

// Singleton instance
let genAIService: GenAIImageService | null = null;

export function getGenAIService(): GenAIImageService {
  if (!genAIService) {
    genAIService = new GenAIImageService();
  }
  return genAIService;
}