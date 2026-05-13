import { Card } from "../ui/card";
import { SectionHeading } from "../section-heading";

const categories = ["Planning", "Web/Tech", "AI/Automation", "Tools"];

export function SkillsSection({ skills }) {
  return (
    <section id="skills" className="bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <SectionHeading
          eyebrow="Skills"
          title="Skills & Expertise"
          description="A focused set of capabilities I bring to product teams."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const categorySkills = skills
              .filter((skill) => skill.category === category)
              .sort((a, b) => a.order - b.order);
            if (!categorySkills.length) return null;
            return (
              <Card key={category} className="space-y-4">
                <div className="text-sm font-semibold text-text border-b border-border pb-2">
                  {category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1.5 rounded-md border border-border bg-bg text-muted text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

