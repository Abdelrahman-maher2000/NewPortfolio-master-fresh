'use client';

import { useEffect } from "react";
import { cn } from "../../lib/utils";

export function Drawer({ open, title, onClose, children, footer, width = "28rem" }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div
        className="absolute inset-y-0 right-0 bg-white shadow-2xl border-l border-border flex flex-col"
        style={{ width }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="font-semibold text-text">{title}</div>
          <button
            className="text-muted hover:text-text transition-colors"
            aria-label="Close drawer"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">{children}</div>
        {footer ? <div className="border-t border-border px-6 py-4">{footer}</div> : null}
      </div>
    </div>
  );
}

