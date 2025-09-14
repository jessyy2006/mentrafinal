import { Button } from "./ui/button";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Home,
  CheckCircle,
} from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onReplay: () => void;
  onBackToProjects: () => void;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onReplay,
  onBackToProjects,
}: StepNavigationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl mx-auto gap-3 sm:gap-0 py-[12px] px-[0px] py-[0px]">
      <div className="flex gap-1.5 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToProjects}
          className="text-xs sm:text-sm px-2 sm:px-3"
        >
          <Home className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
          <span className="hidden sm:inline">Home</span>
        </Button>
      </div>

      <div className="flex gap-1.5 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={currentStep === 1}
          className="text-xs sm:text-sm px-2 sm:px-3"
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        {currentStep === totalSteps ? (
          <Button
            size="sm"
            onClick={onNext}
            className="text-xs sm:text-sm px-2 sm:px-3"
          >
            <span className="hidden sm:inline">Complete</span>
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 sm:ml-2" />
          </Button>
        ) : (
          <Button
            onClick={onNext}
            className="text-xs sm:text-sm px-2 sm:px-3"
            size="sm"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 sm:ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}
