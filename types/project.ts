export interface Step {
  id: number;
  title: string;
  description: string;
  instructions: string[];
  imageUrl: string;
  estimatedTime: string;
  materials?: string[];
  tools?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  totalTime: string;
  steps: Step[];
  thumbnailUrl: string;
}

export interface ProjectSequence {
  id: string;
  title: string;
  description: string;
  projects: Project[];
  thumbnailUrl: string;
  totalEstimatedTime: string;
}