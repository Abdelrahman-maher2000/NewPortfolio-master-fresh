import Link from "next/link";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "../ui/icons";

export function ProjectCard({ project }) {
    return (
        <Card className="p-0 overflow-hidden h-full flex flex-col">
            <div className="aspect-video bg-bg">
                <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-6 flex-1 flex flex-col space-y-4">
                <div className="flex items-center gap-2">
                    {project.featured ? (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                            Featured
                        </span>
                    ) : null}
                    {!project.published ? (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted/10 text-muted">
                            Draft
                        </span>
                    ) : null}
                </div>
                <h3 className="text-lg font-semibold text-text">
                    {project.title}
                </h3>
                <p className="text-sm text-muted line-clamp-3">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md border border-border text-xs text-muted"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="pt-2">
                    <Link href={`/projects/${project.slug}`}>
                        <Button
                            variant="ghost"
                            className="px-0 text-primary hover:text-primary-hover"
                        >
                            View details
                            <ArrowRightIcon className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}
