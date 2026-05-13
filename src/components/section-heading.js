import { cn } from "../lib/utils";

export function SectionHeading({ eyebrow, title, description, align = "left", className }) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "text-center mx-auto max-w-3xl" : "",
        className
      )}
    >
      {eyebrow ? <div className="text-xs uppercase tracking-[0.2em] text-muted">{eyebrow}</div> : null}
      <h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>
      {description ? <p className="text-base text-muted">{description}</p> : null}
    </div>
  );
}

