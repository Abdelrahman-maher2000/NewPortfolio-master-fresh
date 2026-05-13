import Link from "next/link";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { SectionHeading } from "../section-heading";
import { ArrowRightIcon } from "../ui/icons";

export function ProjectsPreview({ projects }) {
  const featured = projects
    .filter((project) => project.published)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  return (
    <section id="projects" className="bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <SectionHeading
            eyebrow="Projects"
            title="Featured Projects"
            description="Selected work that highlights product thinking, UI craft, and delivery."
          />
          <Link href="/projects">
            <Button variant="secondary" className="px-5">
              View all
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((project) => (
            <Card key={project.id} className="p-0 overflow-hidden">
              <div className="aspect-video bg-bg">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs text-accent font-semibold">
                  {project.featured ? "Featured" : "Project"}
                </div>
                <h3 className="text-xl font-semibold text-text">{project.title}</h3>
                <p className="text-sm text-muted line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-bg border border-border text-xs text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 ? (
                    <span className="text-xs text-muted px-2 py-1">+{project.techStack.length - 3}</span>
                  ) : null}
                </div>
                <Link href={`/projects/${project.slug}`}>
                  <Button variant="ghost" className="px-0 text-primary hover:text-primary-hover">
                    View details
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

