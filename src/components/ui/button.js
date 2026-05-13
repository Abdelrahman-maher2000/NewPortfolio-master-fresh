const variants = {
    primary:
        "bg-primary text-white hover:bg-primary-hover active:bg-primary-hover/90",
    secondary:
        "bg-card text-text border border-border hover:bg-bg active:bg-bg/70",
    ghost: "text-muted hover:text-text hover:bg-bg active:bg-bg/80",
    subtle: "bg-primary/10 text-primary hover:bg-primary/15 active:bg-primary/20",
};

const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
};

export function Button({
    as = "button",
    variant = "primary",
    size = "md",
    className,
    children,
    ...props
}) {
    const Comp = as;
    const base =
        "inline-flex items-center justify-center text-center rounded-lg font-medium leading-none whitespace-nowrap transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:shadow-inner active:translate-y-[1px] ";
    const variantClass = variants[variant] || variants.primary;
    const sizeClass = sizes[size] || sizes.md;
    const mergedClassName = `${base} ${variantClass} ${sizeClass} ${
        className || ""
    }`.trim();

    return (
        <Comp className={mergedClassName} {...props}>
            {children}
        </Comp>
    );
}
