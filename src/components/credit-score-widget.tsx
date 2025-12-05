'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CreditScoreWidgetProps {
  score: number;
  maxScore?: number;
  className?: string;
}

export function CreditScoreWidget({ score, maxScore = 900, className }: CreditScoreWidgetProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const progress = score / maxScore;
  const offset = circumference * (1 - progress);

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setAnimatedScore(score);
    });
    return () => cancelAnimationFrame(animation);
  }, [score]);

  const scoreColor =
    progress > 0.8
      ? 'text-primary'
      : progress > 0.6
      ? 'text-green-500'
      : progress > 0.4
      ? 'text-yellow-500'
      : 'text-red-500';

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="hsl(var(--border))"
          strokeWidth="15"
          fill="transparent"
          className=" "
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="hsl(var(--primary))"
          strokeWidth="15"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span
          className={cn(
            'font-headline text-6xl font-bold transition-colors duration-500',
            scoreColor
          )}
        >
          {Math.round(animatedScore)}
        </span>
        <p className="text-sm text-muted-foreground">out of {maxScore}</p>
      </div>
    </div>
  );
}
