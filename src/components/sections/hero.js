"use client";

import { Button } from "../ui/button";
import { ArrowRightIcon, DownloadIcon } from "../ui/icons";

export function Hero({ about }) {
    const handleScroll = () => {
        document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="bg-card" id="home">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="max-w-3xl space-y-6">
                    <p className="text-sm uppercase tracking-[0.25em] text-muted">
                        Portfolio
                    </p>
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                        {about.name}
                    </h1>
                    <p className="text-xl text-muted">
                        {about.title}
                    </p>
                    <p className="text-lg text-muted/90 max-w-2xl">
                        {about.tagline}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button
                            onClick={handleScroll}
                            className="px-6"
                        >
                            View Projects
                            <ArrowRightIcon className="h-4 w-4" />
                        </Button>
                        {about.cvUrl ? (
                            <Button
                                variant="secondary"
                                className="px-6"
                                onClick={() =>
                                    window.open(about.cvUrl, "_blank")
                                }
                            >
                                <DownloadIcon className="h-4 w-4" />
                                Download CV
                            </Button>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}
