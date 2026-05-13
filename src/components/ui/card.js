import { cn } from "../../lib/utils";

export function Card({ className, children, padded = true }) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl shadow-sm",
        padded ? "p-6" : "",
        className
      )}
    >
      {children}
    </div>
  );
}

