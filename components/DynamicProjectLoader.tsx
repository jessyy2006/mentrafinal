"use client";

import { useEffect, useState } from 'react';
import { fetchProjectData } from '@/lib/fetch-project-data';
import { Project, Step } from '@/types/project';

interface DynamicProjectLoaderProps {
  onProjectLoaded: (project: Project) => void;
  children?: React.ReactNode;
}

export function DynamicProjectLoader({ onProjectLoaded, children }: DynamicProjectLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setIsLoading(true);
        const liveData = await fetchProjectData();

        if (!liveData) {
          throw new Error('Could not fetch project data');
        }

        // Transform the live data to match our Project interface
        const project: Project = {
          id: liveData.project.id || 'bookcase',
          title: liveData.product_title || liveData.project.name,
          description: `Assemble your ${liveData.product_title}`,
          difficulty: 'Beginner',
          totalTime: '1-2 hours',
          thumbnailUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
          steps: liveData.project.steps.map((step: any) => ({
            id: step.id,
            title: step.title,
            description: step.description,
            instructions: step.details || [],
            imageUrl: `https://hackmit25.s3.amazonaws.com/bookcase-step-${step.id}.jpg`,
            estimatedTime: `${10 + (step.id - 1) * 5} minutes`,
            materials: extractMaterials(step),
            tools: extractTools(step),
          }))
        };

        onProjectLoaded(project);
        setError(null);
      } catch (err) {
        console.error('Error loading project:', err);
        setError('Failed to load project data');
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [onProjectLoaded]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-lg">Loading project data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return <>{children}</>;
}

// Helper functions to extract materials and tools from step data
function extractMaterials(step: any): string[] {
  // Map step ID to known materials
  const materialsMap: { [key: number]: string[] } = {
    1: ["Side panels", "Top shelf", "Bottom shelf", "Cam locks", "Screws"],
    2: ["Middle shelf", "Cam locks", "Screws"],
    3: ["Back panel", "Screws"],
    4: ["Leveling feet"],
    5: ["Wall anchors", "Screws"],
  };
  return materialsMap[step.id] || [];
}

function extractTools(step: any): string[] {
  // Map step ID to known tools
  const toolsMap: { [key: number]: string[] } = {
    1: ["Screwdriver", "Allen wrench"],
    2: ["Screwdriver", "Level"],
    3: ["Screwdriver", "Measuring tape"],
    4: ["Screwdriver"],
    5: ["Drill", "Stud finder", "Screwdriver"],
  };
  return toolsMap[step.id] || [];
}