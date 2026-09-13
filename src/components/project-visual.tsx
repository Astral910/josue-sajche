import { cn } from "@/lib/utils";

const visualStyles = {
  amber: "[--glow:rgba(232,184,109,.58)] [--x:70%] [--y:42%]",
  signal: "[--glow:rgba(147,255,193,.42)] [--x:58%] [--y:48%]",
  blue: "[--glow:rgba(105,150,255,.45)] [--x:68%] [--y:38%]",
  steel: "[--glow:rgba(210,218,230,.32)] [--x:43%] [--y:55%]",
  ember: "[--glow:rgba(255,112,72,.38)] [--x:72%] [--y:60%]",
} as const;

interface ProjectVisualProps {
  name: string;
  index: string;
  visual: keyof typeof visualStyles;
  className?: string;
}

export function ProjectVisual({
  name,
  index,
  visual,
  className,
}: ProjectVisualProps) {
  return (
    <div
      className={cn(
        "project-visual relative isolate min-h-[22rem] overflow-hidden",
        visualStyles[visual],
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute -right-[8%] top-1/2 h-[72%] w-[52%] -translate-y-1/2 rotate-12 border border-white/20 bg-white/[0.035] backdrop-blur-[2px]" />
      <div className="absolute right-[12%] top-[18%] size-40 rotate-45 border border-white/10 md:size-56" />
      <span className="display absolute bottom-3 left-4 text-[6rem] font-bold leading-none text-white/[0.055] md:text-[10rem]">
        {index}
      </span>
      <span className="section-label absolute right-5 top-5 text-white/60">
        {name}
      </span>
    </div>
  );
}
