import { cn } from "@/lib/utils";

export function Logo({
  size = "md",
  className,
  tagline = true,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  tagline?: boolean;
}) {
  const showTag = tagline && size !== "sm";
  return (
    <span className={cn("brand", className)}>
      <span className="brand__mark" aria-hidden="true">
        <i />
      </span>
      <span>
        <b>CINEVO</b>
        {showTag ? <small>Private cinema, reinvented</small> : null}
      </span>
    </span>
  );
}
