import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { CheckCircle } from "lucide-react";
import { Step } from "../types/project";
import { NextStepPreview } from "./NextStepPreview";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  projectTitle: string;
  nextStep?: Step | null;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  projectTitle,
  nextStep,
}: ProgressIndicatorProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;
  const isComplete = currentStep === totalSteps;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-1 my-[4px] mt-[6px] mr-[0px] mb-[0px] ml-[0px] px-[0px] py-[2px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-[0px] mr-[0px] mb-[4px] ml-[0px]">
        <div className="flex-1">
          <h2 className="flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl">
            {isComplete && (
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            )}
            <span className="truncate text-[18px]">{projectTitle}</span>
          </h2>
        </div>
        {isComplete ? (
          <Badge
            variant="default"
            className="w-fit text-xs sm:text-sm bg-green-600 text-white hover:bg-green-700"
          >
            Complete!
          </Badge>
        ) : nextStep ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-full px-3 py-1">
            <span className="text-[14px] text-muted-foreground/70">Next:</span>
            <span className="truncate max-w-[120px] sm:max-w-[150px] text-[14px]">
              {nextStep.title}
            </span>
          </div>
        ) : (
          <Badge variant="secondary" className="w-fit text-xs sm:text-sm">
            Final Step
          </Badge>
        )}
      </div>

      <Progress value={progressPercentage} className="w-full h-1" />

      <NextStepPreview nextStep={nextStep ?? null} />
    </div>
  );
}
