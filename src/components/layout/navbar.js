"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";

const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    // { href: "#contact", label: "Contact" },
];

export function Navbar({ name = "Alex Johnson" }) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [active, setActive] = useState("home");

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 8);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isHome = pathname === "/";

    return (
        <header
            className={cn(
                "sticky top-0 z-40 border-b border-transparent transition-all",
                isScrolled
                    ? "bg-white/90 backdrop-blur border-border/80 shadow-sm"
                    : "bg-white"
            )}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="font-semibold text-text hover:text-primary transition-colors"
                >
                    {name}
                </Link>
                <nav className="hidden md:flex items-center gap-7 text-sm">
                    {navItems.map((item) => {
                        const active =
                            (!item.anchor &&
                                pathname === item.href) ||
                            (item.anchor && isHome);

                        return (
                            <a
                                key={item.href}
                                href={item.href}
                                className={`group relative transition-colors hover:text-text ${
                                    active == item.label
                                        ? "text-primary Active"
                                        : "text-muted"
                                }`}
                                onClick={() => setActive(item.label)}
                            >
                                <span className="relative">
                                    {item.label}
                                    <span
                                        className={cn(
                                            "absolute -bottom-3 left-0 right-0 h-0.5 bg-primary origin-left scale-x-0 transition-transform duration-200",
                                            (active &&
                                                pathname === "/") ||
                                                undefined,
                                            "group-hover:scale-x-100",
                                            active && pathname === "/"
                                                ? "scale-x-100"
                                                : ""
                                        )}
                                    />
                                </span>
                            </a>
                        );
                    })}
                </nav>
                <Link
                    href="/admin/projects"
                    className="text-sm text-muted hover:text-primary transition-colors"
                >
                    Admin
                </Link>
            </div>
        </header>
    );
}
