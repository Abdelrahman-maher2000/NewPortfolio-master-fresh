'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const tabs = [
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/certificates", label: "Certificates" },
];

export function AdminTopbar({ title = "Admin Dashboard", onLogout, onLogin, isAuthed }) {
  const pathname = usePathname();

  return (
    <div className="border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          <div className="font-semibold text-text">{title}</div>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" className="text-muted hover:text-text">
                Back to site
              </Button>
            </Link>
            {isAuthed ? (
              <Button variant="ghost" className="text-muted hover:text-text" onClick={onLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="ghost" className="text-muted hover:text-text" onClick={onLogin}>
                Login
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 pb-3 overflow-x-auto">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link key={tab.href} href={tab.href}>
                <span
                  className={cn(
                    "inline-flex px-3 py-2 text-sm rounded-md border transition-colors",
                    active
                      ? "border-primary bg-primary text-white"
                      : "border-transparent text-muted hover:text-text hover:bg-bg"
                  )}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

