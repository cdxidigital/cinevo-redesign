import { cn } from "@/lib/utils";

const sizes = {
  sm: "text-2xl",
  md: "text-3xl md:text-4xl",
  lg: "text-5xl md:text-6xl",
  xl: "text-6xl md:text-8xl",
} as const;

export function Logo({
  size = "md",
  className,
}: {
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block font-display font-extrabold tracking-tight leading-none text-cine-text",
        sizes[size],
        className,
      )}
    >
      CINEVO
    </span>
  );
}
