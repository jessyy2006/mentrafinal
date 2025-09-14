"use client";

import React from "react";
import { useState, useEffect, useRef } from "react";
import { Project } from "@/types/project";
import { DynamicProjectLoader } from "@/components/DynamicProjectLoader";
import { fetchProjectData } from "@/lib/fetch-project-data";
import { LandingPage } from "@/components/LandingPage";
import { DetectedObjectCard } from "@/components/DetectedObjectCard";
import { StepDisplay } from "@/components/StepDisplay";
import { StepNavigation } from "@/components/StepNavigation";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { NextStepPreview } from "@/components/NextStepPreview";
import { CompletionPage } from "@/components/CompletionPage";
import { motion, AnimatePresence } from "motion/react";

type AppState = "landing" | "detected" | "instructions" | "completed";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [detectedProject, setDetectedProject] = useState<Project | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);
  const [isPolling, setIsPolling] = useState(true);
  const [lastBarcode, setLastBarcode] = useState<string | null>(null);

  const handleSimulateDetection = async () => {
    // Fetch live project data from S3
    try {
      const liveData = await fetchProjectData();
      if (liveData) {
        // Use data exactly as it comes from informationlive.json
        const project: Project = {
          id: liveData.project.id || liveData.barcode,
          title: liveData.product_title,
          description: liveData.project.name || `Assemble ${liveData.product_title}`,
          difficulty: 'Beginner',
          totalTime: `${liveData.project.totalSteps * 15} minutes`,
          thumbnailUrl: liveData.thumbnail_url || 'https://via.placeholder.com/800x600',
          steps: liveData.project.steps.map((step: any) => ({
            id: step.id,
            title: step.title,
            description: step.description,
            instructions: step.details || [],
            imageUrl: liveData.pdf_url || '',
            estimatedTime: step.estimated_time || `${15} minutes`,
            materials: step.materials || extractMaterialsFromDetails(step.details),
            tools: step.tools || extractToolsFromDetails(step.details),
          }))
        };
        setDetectedProject(project);
        setAppState("detected");
      }
    } catch (error) {
      console.error('Error fetching project data:', error);
      alert('Could not fetch project data. Please check the connection.');
    }
  };

  // Extract materials and tools from step details
  const extractMaterialsFromDetails = (details: string[] = []): string[] => {
    // Try to extract materials from the details text
    const materials: string[] = [];
    details.forEach(detail => {
      // Look for common material patterns
      if (detail.toLowerCase().includes('panel') ||
          detail.toLowerCase().includes('shelf') ||
          detail.toLowerCase().includes('screw') ||
          detail.toLowerCase().includes('piece') ||
          detail.toLowerCase().includes('part')) {
        // Extract the material name
        const words = detail.split(' ');
        if (words.length > 0) {
          materials.push(words.slice(0, 3).join(' '));
        }
      }
    });
    return materials.length > 0 ? materials : ['Assembly parts'];
  };

  const extractToolsFromDetails = (details: string[] = []): string[] => {
    // Try to extract tools from the details text
    const tools: string[] = [];
    const toolKeywords = ['drill', 'screwdriver', 'hammer', 'wrench', 'level', 'measure'];

    details.forEach(detail => {
      toolKeywords.forEach(tool => {
        if (detail.toLowerCase().includes(tool)) {
          tools.push(tool.charAt(0).toUpperCase() + tool.slice(1));
        }
      });
    });

    // If no tools mentioned, check if it's a tool-free assembly (like LEGO)
    return tools.length > 0 ? [...new Set(tools)] : [];
  };

  const handleStartInstructions = () => {
    setCurrentStepIndex(0);
    setAppState("instructions");
  };

  const handleBackToDetection = () => {
    setAppState("detected");
    setCurrentStepIndex(0);
  };

  const handleBackToLanding = () => {
    setAppState("landing");
    setDetectedProject(null);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (detectedProject) {
      if (currentStepIndex < detectedProject.steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
      } else {
        // Project completed - go to completion page
        setAppState("completed");
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReplayStep = () => {
    setIsReplaying(true);
    setTimeout(() => setIsReplaying(false), 500);
  };

  const handleContinueBuilding = () => {
    // Return to the last step for review/modifications
    setCurrentStepIndex(detectedProject ? detectedProject.steps.length - 1 : 0);
    setAppState("instructions");
  };

  const handleNextProject = () => {
    // No more projects - go back to landing
    handleDetectNext();
  };

  const handleDetectNext = () => {
    // Reset everything and go back to landing for next detection
    setAppState("landing");
    setDetectedProject(null);
    setCurrentStepIndex(0);
    setIsPolling(true); // Resume polling for new items
  };

  // Auto-detection polling effect
  useEffect(() => {
    if (!isPolling || appState !== "landing") return;

    const checkForNewProject = async () => {
      try {
        const liveData = await fetchProjectData();
        if (liveData && liveData.barcode !== lastBarcode) {
          // New barcode detected!
          setLastBarcode(liveData.barcode);

          const project: Project = {
            id: liveData.project.id || liveData.barcode,
            title: liveData.product_title,
            description: liveData.project.name || `Assemble ${liveData.product_title}`,
            difficulty: 'Beginner',
            totalTime: `${liveData.project.totalSteps * 15} minutes`,
            thumbnailUrl: liveData.thumbnail_url || 'https://via.placeholder.com/800x600',
            steps: liveData.project.steps.map((step: any) => ({
              id: step.id,
              title: step.title,
              description: step.description,
              instructions: step.details || [],
              imageUrl: liveData.pdf_url || '',
              estimatedTime: step.estimated_time || `${15} minutes`,
              materials: step.materials || extractMaterialsFromDetails(step.details),
              tools: step.tools || extractToolsFromDetails(step.details),
            }))
          };

          setDetectedProject(project);
          setAppState("detected");
          setIsPolling(false); // Stop polling once detected
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    };

    // Poll every 2 seconds
    const interval = setInterval(checkForNewProject, 2000);

    // Check immediately on mount
    checkForNewProject();

    return () => clearInterval(interval);
  }, [isPolling, appState, lastBarcode]);

  return (
    <div className="min-h-screen bg-background px-[0px] p-[0px] mx-[0px] m-[0px]">
      <div className="container mx-auto sm:px-4 sm:py-8 landscape:py-3 px-[16px] px-[14px] py-[12px] py-[0px]">
        <AnimatePresence mode="wait">
          {appState === "landing" && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LandingPage
                hasDetectedObject={false}
                onSimulateDetection={handleSimulateDetection}
                isPolling={isPolling}
              />
            </motion.div>
          )}

          {appState === "detected" && detectedProject && (
            <motion.div
              key="detected"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen flex flex-col items-center justify-center px-6 py-8 landscape:py-4"
            >
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-6 landscape:space-y-4 mb-8 landscape:mb-6 max-w-md landscape:max-w-2xl"
              >
                {/* Success Status */}
                <div className="space-y-2 landscape:space-y-1">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-12 h-12 landscape:w-10 landscape:h-10 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 landscape:mb-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="w-6 h-6 landscape:w-5 landscape:h-5 text-green-600 dark:text-green-400"
                    >
                      ✓
                    </motion.div>
                  </motion.div>

                  <h1 className="text-xl landscape:text-lg font-medium text-green-600 dark:text-green-400 font-bold">
                    Project Detected!
                  </h1>
                </div>
              </motion.div>

              {/* Project Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full max-w-md landscape:max-w-lg"
              >
                <DetectedObjectCard
                  project={detectedProject}
                  onStartInstructions={handleStartInstructions}
                />
              </motion.div>

              {/* Back Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={handleBackToLanding}
                className="mt-8 landscape:mt-6 text-[12px] landscape:text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to detection
              </motion.button>
            </motion.div>
          )}

          {appState === "instructions" && detectedProject && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 sm:space-y-8 landscape:space-y-2"
            >
              <ProgressIndicator
                currentStep={currentStepIndex + 1}
                totalSteps={detectedProject.steps.length}
                projectTitle={detectedProject.title}
                nextStep={
                  currentStepIndex < detectedProject.steps.length - 1
                    ? detectedProject.steps[currentStepIndex + 1]
                    : null
                }
              />

              <motion.div
                key={`${detectedProject.id}-${currentStepIndex}-${
                  isReplaying ? "replay" : "normal"
                }`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <StepDisplay
                  step={detectedProject.steps[currentStepIndex]}
                  stepNumber={currentStepIndex + 1}
                  totalSteps={detectedProject.steps.length}
                />
              </motion.div>

              <StepNavigation
                currentStep={currentStepIndex + 1}
                totalSteps={detectedProject.steps.length}
                onPrevious={handlePreviousStep}
                onNext={handleNextStep}
                onReplay={handleReplayStep}
                onBackToProjects={handleBackToDetection}
              />
            </motion.div>
          )}

          {appState === "completed" && detectedProject && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
            >
              <CompletionPage
                project={detectedProject}
                onContinueBuilding={handleContinueBuilding}
                onNextProject={handleNextProject}
                onDetectNext={handleDetectNext}
                hasNextProject={false}
                nextProject={null}
                sequenceTitle=""
                projectNumber={1}
                totalProjects={1}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}