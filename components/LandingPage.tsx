import { motion } from 'motion/react';
import { Glasses, Scan, Wrench, Hammer, Drill, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface LandingPageProps {
  hasDetectedObject: boolean;
  onSimulateDetection: () => void;
}

export function LandingPage({ hasDetectedObject, onSimulateDetection }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 landscape:py-4">
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md z-10 space-y-8 landscape:space-y-4 landscape:max-w-2xl"
      >
        {/* App Logo/Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="w-20 h-20 landscape:w-16 landscape:h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <Glasses className="w-10 h-10 landscape:w-8 landscape:h-8 text-primary-foreground" />
          </div>
        </motion.div>

        {/* App Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-2 landscape:space-y-1"
        >
          <h1 className="text-[24px] font-bold">Mentra DIY Companion</h1>
          <p className="text-muted-foreground text-[14px]">
            Point your glasses at any DIY project to get started
          </p>
        </motion.div>

        {/* Detection Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6 landscape:space-y-4"
        >
          {/* Handyman Animation */}
          <div className="flex flex-col items-center space-y-4 landscape:space-y-3">
            <div className="relative w-20 h-20 landscape:w-16 landscape:h-16 flex items-center justify-center">
              {hasDetectedObject ? (
                // Project detected - celebratory tool animation
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: "backOut" }}
                  className="text-green-600"
                >
                  <Wrench className="w-10 h-10 landscape:w-8 landscape:h-8" />
                </motion.div>
              ) : (
                // Scanning - animated working tools
                <>
                  {/* Hammer */}
                  <motion.div
                    animate={{ 
                      rotate: [0, -15, 0],
                      y: [0, -2, 0]
                    }}
                    transition={{ 
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0
                    }}
                    className="absolute top-0 left-2 text-muted-foreground/60"
                  >
                    <Hammer className="w-5 h-5" />
                  </motion.div>

                  {/* Drill */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                      scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute top-2 right-1 text-muted-foreground/60"
                  >
                    <Drill className="w-4 h-4" />
                  </motion.div>

                  {/* Settings gear */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 90, 180, 270, 360],
                      x: [0, 1, 0, -1, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute bottom-1 left-0 text-muted-foreground/60"
                  >
                    <Settings className="w-4 h-4" />
                  </motion.div>

                  {/* Wrench */}
                  <motion.div
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                    className="absolute bottom-0 right-2 text-muted-foreground/60"
                  >
                    <Wrench className="w-5 h-5" />
                  </motion.div>

                  {/* Center scanning indicator */}
                  <motion.div
                    animate={{ 
                      scale: [0.8, 1, 0.8],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-muted-foreground/50"
                  >
                    <Scan className="w-6 h-6 landscape:w-5 landscape:h-5" />
                  </motion.div>
                </>
              )}
            </div>

            {hasDetectedObject ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-1"
              >
                <p className="font-medium text-green-600 landscape:text-sm">Project Detected!</p>
                <p className="text-sm text-muted-foreground landscape:text-xs">
                  Visual instructions are ready
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-1"
              >
                <p className="font-medium landscape:text-sm text-[14px]">Scanning for projects...</p>

              </motion.div>
            )}
          </div>

          {/* Demo Button - Only show when no object detected */}
          {!hasDetectedObject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="pt-4"
            >
              <Card className="w-full max-w-xs mx-auto cursor-pointer hover:shadow-lg transition-all duration-300 border border-primary/20">
                <CardContent className="p-4">
                  <Button
                    onClick={onSimulateDetection}
                    variant="ghost"
                    className="w-full text-[14px] font-medium p-0 h-auto hover:bg-transparent"
                  >
                    Try Demo Project
                  </Button>
                  <p className="text-xs text-muted-foreground landscape:text-[12px] mt-2 opacity-75 text-[14px]">
                    Simulate object detection for testing
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}