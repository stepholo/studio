'use client';

import { cn } from "@/lib/utils";

interface SignupProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function SignupProgress({ currentStep, totalSteps, className }: SignupProgressProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("relative h-24 w-24", className)}>
      <svg className="h-full w-full" viewBox="0 0 100 100">
        <circle
          className="stroke-current text-border"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <circle
          className="stroke-current text-primary transition-all duration-500 ease-in-out"
          strokeWidth="10"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          strokeDasharray={2 * Math.PI * 40}
          strokeDashoffset={2 * Math.PI * 40 * (1 - progressPercentage / 100)}
          transform="rotate(-90 50 50)"
        ></circle>
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dy="0.3em"
          className="fill-current font-bold text-foreground text-lg"
        >
          {`${currentStep}/${totalSteps}`}
        </text>
      </svg>
    </div>
  );
}
