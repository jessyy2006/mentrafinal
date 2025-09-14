import { Project } from '../types/project';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Clock, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProjectSelectorProps {
  projects: Project[];
  selectedProjectId: string | null;
  onProjectSelect: (project: Project) => void;
}

export function ProjectSelector({ projects, selectedProjectId, onProjectSelect }: ProjectSelectorProps) {
  if (selectedProjectId) return null;

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1>DIY Project Builder</h1>
        <p className="text-muted-foreground">Choose a project to get started with step-by-step instructions</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card 
            key={project.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onProjectSelect(project)}
          >
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <ImageWithFallback 
                src={project.thumbnailUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <Badge variant={
                  project.difficulty === 'Beginner' ? 'secondary' : 
                  project.difficulty === 'Intermediate' ? 'default' : 
                  'destructive'
                }>
                  {project.difficulty}
                </Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {project.totalTime}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {project.steps.length} steps
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}