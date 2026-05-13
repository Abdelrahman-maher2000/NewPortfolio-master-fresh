import { Card } from "../ui/card";
import { SectionHeading } from "../section-heading";
import { Button } from "../ui/button";
import { GithubIcon, LinkedinIcon, MailIcon } from "../ui/icons";

export function ContactSection({ about }) {
    const links = [
        {
            label: "Email",
            href: `https://mail.google.com/mail/?view=cm&fs=1&to=${about.email}`,
            description: about.email,
            icon: <MailIcon className="h-5 w-5" />,
            external: true,
        },
        {
            label: "LinkedIn",
            href: about.linkedin,
            description: "Connect on LinkedIn",
            icon: <LinkedinIcon className="h-5 w-5" />,
            external: true,
        },
        {
            label: "GitHub",
            href: about.github,
            description: "View repositories",
            icon: <GithubIcon className="h-5 w-5" />,
            external: true,
        },
    ];

    return (
        <section id="contact" className="bg-card">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
                <SectionHeading
                    eyebrow="Contact"
                    title="Let's connect"
                    description="Interested in working together or have a question? Reach out anytime."
                />
                <div className="grid xl:grid-cols-3 gap-6">
                    {links.map((link) => (
                        <Card
                            key={link.label}
                            className="flex items-start gap-4 flex-wrap"
                        >
                            <div className="h-12 w-12 rounded-lg bg-bg border border-border flex items-center justify-center text-muted shrink-0">
                                {link.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm text-muted">
                                    {link.label}
                                </div>
                                <div className="text-text font-medium break-words">
                                    {link.description}
                                </div>
                            </div>
                            <Button
                                as="a"
                                href={link.href || "#"}
                                target={
                                    link.external
                                        ? "_blank"
                                        : undefined
                                }
                                rel={
                                    link.external
                                        ? "noreferrer noopener"
                                        : undefined
                                }
                                variant="ghost"
                                className="text-primary hover:text-primary-hover self-start"
                            >
                                Open
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
