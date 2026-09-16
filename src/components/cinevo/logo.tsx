import { cn } from "@/lib/utils";

const FACETS = [
  { d: "70,40 70,120 113.33,120", fill: "#FF4DA5" },
  { d: "70,120 70,200 113.33,120", fill: "#C13BE0" },
  { d: "70,200 135,160 113.33,120", fill: "#FF9F1C" },
  { d: "135,160 200,120 113.33,120", fill: "#3E8EFF" },
  { d: "200,120 135,80 113.33,120", fill: "#55CFFF" },
  { d: "135,80 70,40 113.33,120", fill: "#8B2FFF" },
];

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 240" className={cn("brand__gem", className)} aria-hidden="true">
      {FACETS.map((f) => (
        <polygon
          key={f.fill}
          points={f.d}
          fill={f.fill}
          stroke="#fff"
          strokeOpacity="0.35"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      ))}
      <polygon points="150,88 168,100 150,108" fill="#fff" fillOpacity="0.55" />
    </svg>
  );
}

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
      <Mark />
      <span>
        <b>CINEVO</b>
        {showTag ? <small>Your media. Your moment.</small> : null}
      </span>
    </span>
  );
}
