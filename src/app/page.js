"use client";

import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { Hero } from "../components/sections/hero";
import { AboutSection } from "../components/sections/about";
import { SkillsSection } from "../components/sections/skills";
import { ProjectsPreview } from "../components/sections/projects-preview";
import { ContactSection } from "../components/sections/contact";
import { usePortfolio } from "../context/portfolio-context";

export default function HomePage() {
    const { data, ready } = usePortfolio();

    if (!ready) {
        return <div className="min-h-screen bg-bg" />;
    }

    return (
        <div className="min-h-screen bg-bg">
            <Navbar name={data.about.name} />
            <Hero about={data.about} />
            <AboutSection about={data.about} />
            <SkillsSection skills={data.skills} />
            <ProjectsPreview projects={data.projects} />
            {/* <ContactSection about={data.about} /> */}
            <Footer />
        </div>
    );
}
