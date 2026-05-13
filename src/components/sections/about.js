import { Card } from "../ui/card";
import { SectionHeading } from "../section-heading";

export function AboutSection({ about }) {
  return (
    <section id="about" className="bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <SectionHeading
          eyebrow="About"
          title="About Me"
          description="A quick snapshot of what I do and how I work."
        />
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <Card className="md:col-span-2 space-y-5">
            <p className="text-lg text-muted leading-relaxed">{about.bio}</p>
            <div className="space-y-3">
              {about.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-semibold">
                    ✓
                  </span>
                  <p className="text-muted">{item}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-0 overflow-hidden">
            <div className="aspect-square">
              {about.profileImage ? (
                <img
                  src={about.profileImage}
                  alt={about.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-bg flex items-center justify-center text-muted">
                  Profile
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

