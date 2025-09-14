import { Step } from '../types/project';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Package, Wrench } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StepDisplayProps {
  step: Step;
  stepNumber: number;
  totalSteps: number;
}

export function StepDisplay({ step, stepNumber, totalSteps }: StepDisplayProps) {
  return (
    <Card className="w-full max-w-6xl mx-auto px-[0px] pt-[12px] pb-[0px]">
      <CardHeader className="pb-0 px-[24px] py-[0px] mx-[0px] m-[0px]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Badge variant="outline" className="w-fit">Step {stepNumber} of {totalSteps}</Badge>
              <span className="text-base sm:text-lg font-bold text-[20px]">{step.title}</span>
            </CardTitle>
            <CardDescription className="mt-0">{step.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="py-[0px] px-[24px] pb-[0px]">
        {/* Mobile landscape: side by side layout */}
        <div className="grid grid-cols-1 landscape:grid-cols-2 gap-2 sm:gap-3">
          <div className="landscape:order-1">
            <div className="aspect-video rounded-lg overflow-hidden">
              <ImageWithFallback 
                src={step.imageUrl}
                alt={step.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4 landscape:order-2 flex items-center justify-center">
            <div className="text-center space-y-3">

              {(step.materials || step.tools) && (
                <div className="grid gap-10 sm:gap-12 grid-cols-1 sm:grid-cols-2 text-left">
                  {step.materials && (
                    <div className="space-y-1.5 sm:space-y-2 pl-4">
                      <h4 className="flex items-center gap-2 text-sm sm:text-base mt-[0px] mr-[0px] mb-[7px] ml-[0px]">
                        <Package className="w-4 h-4" />
                        Materials Needed
                      </h4>
                      <ul className="space-y-1">
                        {step.materials.map((material, index) => (
                          <li key={index} className="text-xs sm:text-sm text-muted-foreground">
                            • {material}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {step.tools && (
                    <div className="space-y-1.5 sm:space-y-2 pl-4">
                      <h4 className="flex items-center gap-2 text-sm sm:text-base">
                        <Wrench className="w-4 h-4" />
                        Tools Required
                      </h4>
                      <ul className="space-y-1">
                        {step.tools.map((tool, index) => (
                          <li key={index} className="text-xs sm:text-sm text-muted-foreground">
                            • {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}