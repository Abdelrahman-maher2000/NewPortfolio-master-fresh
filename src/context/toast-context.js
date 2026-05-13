'use client';

import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { createId } from "../lib/utils";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = (toast) => {
    const id = createId();
    const payload = {
      id,
      title: toast.title || "",
      description: toast.description || "",
      variant: toast.variant || "success",
    };
    setToasts((prev) => [...prev, payload]);
    setTimeout(() => remove(id), 3600);
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`w-80 rounded-lg border px-4 py-3 shadow-md bg-card border-border ${
              toast.variant === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : toast.variant === "info"
                  ? "border-blue-200 bg-blue-50 text-blue-800"
                  : "border-green-200 bg-green-50 text-green-800"
            }`}
          >
            <div className="font-medium">{toast.title}</div>
            {toast.description ? (
              <p className="text-sm mt-1 text-current/80">{toast.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return ctx;
}

