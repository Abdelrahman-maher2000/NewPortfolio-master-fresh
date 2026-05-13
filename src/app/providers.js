'use client';

import { PortfolioProvider } from "../context/portfolio-context";
import { ToastProvider } from "../context/toast-context";

export default function Providers({ children }) {
  return (
    <ToastProvider>
      <PortfolioProvider>{children}</PortfolioProvider>
    </ToastProvider>
  );
}

