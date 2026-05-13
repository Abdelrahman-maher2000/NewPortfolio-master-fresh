'use client';

import { Navbar } from "../../components/layout/navbar";
import { Footer } from "../../components/layout/footer";
import { SectionHeading } from "../../components/section-heading";
import { ProjectCard } from "../../components/projects/project-card";
import { usePortfolio } from "../../context/portfolio-context";

export default function ProjectsPage() {
  const { data } = usePortfolio();
  const projects = [...data.projects].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-bg">
      <Navbar name={data.about.name} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <SectionHeading
          eyebrow="Projects"
          title="Projects"
          description="A deeper look at the work and outcomes across products."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

