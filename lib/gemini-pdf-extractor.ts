/**
 * Gemini PDF Extractor for assembly instructions
 * Extracts relevant sections from PDF for each step
 */

interface StepImageData {
  stepId: number;
  title: string;
  imageUrl: string;
  pdfSection?: {
    pageNumber: number;
    coordinates?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
}

export class GeminiPDFExtractor {
  private apiKey: string;
  private pdfUrl: string;

  constructor(apiKey: string, pdfUrl: string) {
    this.apiKey = apiKey;
    this.pdfUrl = pdfUrl;
  }

  /**
   * Extract image for a specific step from the PDF
   */
  async extractStepImage(
    stepNumber: number,
    stepTitle: string,
    stepDescription: string
  ): Promise<StepImageData> {
    try {
      // First, try the S3 bucket images if they exist
      const s3ImageUrl = `https://hackmit25.s3.amazonaws.com/projects/492490502940-step-${stepNumber}.jpg`;

      // Check if S3 image exists
      try {
        const response = await fetch(s3ImageUrl, { method: 'HEAD' });
        if (response.ok) {
          return {
            stepId: stepNumber,
            title: stepTitle,
            imageUrl: s3ImageUrl,
          };
        }
      } catch (e) {
        // S3 image doesn't exist, continue with PDF extraction
      }

      // Fetch the PDF
      const pdfResponse = await fetch(this.pdfUrl);
      const pdfBuffer = await pdfResponse.arrayBuffer();
      const pdfBase64 = btoa(
        new Uint8Array(pdfBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );

      // Call Gemini API to analyze the PDF
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;

      const prompt = `
        Analyze this furniture assembly PDF and find the visual instructions for:
        Step ${stepNumber}: ${stepTitle}
        Description: ${stepDescription}

        Identify which page shows this step. Return only the page number.
      `;

      const requestBody = {
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "application/pdf",
                data: pdfBase64
              }
            }
          ]
        }]
      };

      const geminiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!geminiResponse.ok) {
        console.error('Gemini API error:', await geminiResponse.text());
        throw new Error('Failed to analyze PDF');
      }

      const geminiData = await geminiResponse.json();
      console.log('Gemini response:', geminiData);

      // For now, return a direct link to a page in the PDF
      // In production, you'd extract the actual image from the identified page
      const pageNumber = stepNumber; // This would come from Gemini's response

      // Use a PDF page viewer URL (this is a placeholder - you'd need a proper PDF renderer)
      const imageUrl = `${this.pdfUrl}#page=${pageNumber}`;

      return {
        stepId: stepNumber,
        title: stepTitle,
        imageUrl: imageUrl,
        pdfSection: {
          pageNumber: pageNumber,
        },
      };
    } catch (error) {
      console.error(`Error extracting image for step ${stepNumber}:`, error);
      // Fallback to placeholder
      return {
        stepId: stepNumber,
        title: stepTitle,
        imageUrl: `https://via.placeholder.com/800x600?text=Step+${stepNumber}:+${encodeURIComponent(stepTitle)}`,
      };
    }
  }

  /**
   * Extract all step images from the PDF
   */
  async extractAllStepImages(steps: any[]): Promise<StepImageData[]> {
    const extractedImages: StepImageData[] = [];

    for (const step of steps) {
      const imageData = await this.extractStepImage(
        step.id,
        step.title,
        step.description
      );
      extractedImages.push(imageData);
    }

    return extractedImages;
  }
}

// Helper function to get PDF extractor instance
export function getPDFExtractor(
  apiKey?: string,
  pdfUrl?: string
): GeminiPDFExtractor {
  const key = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
  const url = pdfUrl || process.env.NEXT_PUBLIC_PDF_URL || 'https://salsify-ecdn.com/files/e62c7fb40d81f5972267e56bfabeef77.pdf';

  return new GeminiPDFExtractor(key, url);
}