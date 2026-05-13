'use client';

import { cn } from "../../lib/utils";

export function Tabs({ items, value, onChange, className }) {
  return (
    <div className={cn("flex flex-wrap gap-2 rounded-lg bg-card border border-border p-1", className)}>
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              active ? "bg-primary text-white" : "text-muted hover:text-text hover:bg-bg"
            )}
            onClick={() => onChange(item.value)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

