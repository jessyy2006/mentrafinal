/**
 * Fetch live project data from S3
 */

export interface ProjectStep {
  id: number;
  title: string;
  description: string;
  details?: string[];
  tips?: string;
}

export interface ProjectData {
  barcode: string;
  product_title: string;
  timestamp: string;
  project: {
    id: string;
    name: string;
    totalSteps: number;
    source: string;
    steps: ProjectStep[];
  };
  metadata?: any;
}

export async function fetchProjectData(): Promise<ProjectData | null> {
  const PROJECT_DATA_URL = 'https://hackmit25.s3.us-east-1.amazonaws.com/informationlive.json';

  try {
    const response = await fetch(PROJECT_DATA_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch project data: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching project data:', error);
    return null;
  }
}

export async function updateProjectFromLiveData() {
  const liveData = await fetchProjectData();

  if (!liveData) {
    console.error('Could not fetch live project data');
    return null;
  }

  // Transform the live data to match our Project interface
  const project = {
    id: liveData.project.id || 'bookcase',
    title: liveData.product_title || liveData.project.name,
    description: `Assemble your ${liveData.product_title}`,
    difficulty: 'Beginner' as const,
    totalTime: '1-2 hours',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
    steps: liveData.project.steps.map((step: ProjectStep, index: number) => ({
      id: step.id,
      title: step.title,
      description: step.description,
      instructions: step.details || [],
      imageUrl: `https://hackmit25.s3.amazonaws.com/projects/492490502940-step-${step.id}.jpg`,
      estimatedTime: `${10 + index * 5} minutes`,
      materials: [], // These would need to be extracted from the description
      tools: [], // These would need to be extracted from the description
    }))
  };

  return project;
}