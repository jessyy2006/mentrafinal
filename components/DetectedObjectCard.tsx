import { motion } from 'motion/react';
import { Project } from '../types/project';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Package, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
interface DetectedObjectCardProps {
  project: Project;
  onStartInstructions: () => void;
}

export function DetectedObjectCard({ project, onStartInstructions }: DetectedObjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto"
    >
      <Card
        className="cursor-pointer hover:shadow-lg transition-all duration-300 border border-primary/20 bg-card/80 backdrop-blur-sm"
        onClick={onStartInstructions}
      >        
        <CardContent className="p-4 landscape:p-6">
          <div className="flex flex-col landscape:flex-row gap-4 landscape:gap-6 items-center">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full landscape:w-1/3 flex-shrink-0"
            >
              <div className="aspect-video landscape:aspect-square rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            {/* Content Section */}
            <div className="flex-1 text-center landscape:text-left space-y-3 landscape:space-y-4">
              {/* Header */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-2"
              >

                <h2 className="text-xl landscape:text-2xl text-[20px] font-bold font-normal">{project.title}</h2>
              </motion.div>
              
              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-muted-foreground"
              >
                {project.description}
              </motion.p>
              
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center justify-center landscape:justify-start gap-4 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {project.steps.length} steps
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="bg-primary/5 rounded-lg p-3"
              >
                <p className="text-sm text-primary">
                  📱 Tap to Start
                </p>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}