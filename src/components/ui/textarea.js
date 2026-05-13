import { cn } from "../../lib/utils";

export function Textarea({ className, rows = 4, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cn(
        "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text placeholder:text-muted/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition",
        className
      )}
      {...props}
    />
  );
}

