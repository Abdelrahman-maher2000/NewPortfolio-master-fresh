'use client';

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "../../../components/layout/navbar";
import { Footer } from "../../../components/layout/footer";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { ExternalLinkIcon, GithubIcon, ArrowRightIcon } from "../../../components/ui/icons";
import { usePortfolio } from "../../../context/portfolio-context";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data } = usePortfolio();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const match = data.projects.find((item) => item.slug === params.slug);
    if (!match) {
      router.push("/projects");
    } else {
      setProject(match);
    }
  }, [data.projects, params.slug, router]);

  const gallery = useMemo(() => project?.gallery?.slice(1) || [], [project]);

  if (!project) return null;

  return (
    <div className="min-h-screen bg-bg">
      <Navbar name={data.about.name} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-text">
          <ArrowRightIcon className="h-4 w-4 rotate-180" />
          Back to projects
        </Link>

        <Card className="p-0 overflow-hidden">
          <div className="aspect-video bg-bg">
            <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-text">{project.title}</h1>
              <p className="text-lg text-muted">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.liveUrl ? (
                <Button as="a" href={project.liveUrl} target="_blank" rel="noreferrer">
                  <ExternalLinkIcon className="h-4 w-4" />
                  Live demo
                </Button>
              ) : null}
              {project.githubUrl ? (
                <Button
                  as="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </Button>
              ) : null}
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <DetailBlock title="Problem">{project.problem}</DetailBlock>
              <DetailBlock title="My role">{project.role}</DetailBlock>
            </div>

            <DetailBlock title="Solution">{project.solution}</DetailBlock>

            <div className="space-y-3">
              <div className="text-sm font-semibold text-text">Tools & technologies</div>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool) => (
                  <span key={tool} className="px-3 py-1.5 rounded-md border border-border bg-bg text-muted text-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {gallery.length ? (
              <div className="space-y-3 pt-2">
                <div className="text-sm font-semibold text-text">Gallery</div>
                <div className="grid md:grid-cols-2 gap-4">
                  {gallery.map((src, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-border">
                      <img src={src} alt={`${project.title} ${index + 2}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

function DetailBlock({ title, children }) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-text">{title}</div>
      <p className="text-muted leading-relaxed">{children}</p>
    </div>
  );
}

