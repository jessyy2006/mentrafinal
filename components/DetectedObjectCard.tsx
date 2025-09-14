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
              <div className="aspect-video landscape:aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900">
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 text-cyan-400">
                    <svg viewBox="0 0 200 200" className="w-32 h-32 opacity-50">
                      <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse"/>
                      <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                      <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                      <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
                    </svg>
                  </div>
                </div>
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
                className="rounded-lg p-3 border border-primary/20"
              >
                <p className="text-sm font-medium">
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