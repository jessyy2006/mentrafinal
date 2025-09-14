import { motion } from "motion/react";
import {
  CheckCircle,
  Sparkles,
  Hammer,
  Search,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Project } from "../types/project";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface CompletionPageProps {
  project: Project;
  onContinueBuilding: () => void;
  onNextProject?: () => void;
  onDetectNext: () => void;
  hasNextProject?: boolean;
  nextProject?: Project | null;
  sequenceTitle?: string;
  projectNumber?: number;
  totalProjects?: number;
}

export function CompletionPage({
  project,
  onContinueBuilding,
  onNextProject,
  onDetectNext,
  hasNextProject = false,
  nextProject = null,
  sequenceTitle = "",
  projectNumber = 1,
  totalProjects = 1,
}: CompletionPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 mx-[0px] m-[0px]">
      {/* Celebration Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: -100,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              ease: "easeOut",
              repeat: 1,
            }}
            className="absolute text-primary/30"
          >
            <Sparkles size={20 + Math.random() * 20} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center max-w-lg z-10"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.5,
            type: "spring",
            bounce: 0.4,
          }}
          className="mb-6 pt-8"
        >
          <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-[129px] my-[0px]">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </motion.div>

        {/* Congratulations Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-4"
        >
          <h1 className="mb-4 text-[20px]">🎉 Congratulations!</h1>
          <h2 className="m-[0px] font-bold">
            You've completed your {project.title}
          </h2>
        </motion.div>

        {/* Detect Next DIY Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 pt-4"
        >
          <Card className="w-full max-w-xs mx-auto cursor-pointer hover:shadow-lg transition-all duration-300 border border-primary/20">
            <CardContent className="p-4">
              <Button
                onClick={onDetectNext}
                variant="ghost"
                className="w-full text-[14px] font-medium p-0 h-auto hover:bg-transparent"
              >
                Detect Another DIY
              </Button>
              <p className="text-xs text-muted-foreground landscape:text-[12px] mt-2 opacity-75 text-[14px]">
                Scan with your Mentra glasses
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
