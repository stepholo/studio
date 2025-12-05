import { cn } from "@/lib/utils";

export function AppLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-background"></div>
      </div>
      <span className="text-xl font-bold font-headline text-foreground">
        The Circle
      </span>
    </div>
  );
}
