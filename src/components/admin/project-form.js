'use client';

import { useEffect, useState } from "react";
import { Drawer } from "../ui/drawer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  problem: "",
  role: "",
  solution: "",
  tools: "",
  techStack: "",
  coverImage: "",
  gallery: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
  published: true,
  order: 0,
};

export function ProjectForm({ open, onClose, initial, onSave }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        slug: initial.slug || "",
        description: initial.description || "",
        problem: initial.problem || "",
        role: initial.role || "",
        solution: initial.solution || "",
        tools: (initial.tools || []).join(", "),
        techStack: (initial.techStack || []).join(", "),
        coverImage: initial.coverImage || "",
        gallery: (initial.gallery || []).join(", "),
        liveUrl: initial.liveUrl || "",
        githubUrl: initial.githubUrl || "",
        featured: initial.featured ?? false,
        published: initial.published ?? true,
        order: initial.order ?? 0,
      });
    } else {
      setForm(emptyForm);
    }
  }, [initial, open]);

  useEffect(() => {
    if (form.title && !initial) {
      const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      setForm((prev) => ({ ...prev, slug }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: form.description,
      problem: form.problem,
      role: form.role,
      solution: form.solution,
      tools: form.tools
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      techStack: form.techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      coverImage: form.coverImage,
      gallery: form.gallery
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      liveUrl: form.liveUrl || undefined,
      githubUrl: form.githubUrl || undefined,
      featured: Boolean(form.featured),
      published: Boolean(form.published),
      order: Number(form.order) || 0,
    };

    await onSave?.(payload, initial?.id);
  };

  const footer = (
    <div className="flex items-center gap-3">
      <Button type="submit" form="project-form">
        Save project
      </Button>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
    </div>
  );

  return (
    <Drawer open={open} onClose={onClose} title={initial ? "Edit project" : "Add project"} footer={footer}>
      <form id="project-form" className="space-y-5" onSubmit={handleSubmit}>
        <Field label="Title" required>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </Field>
        <Field label="Slug" required hint="Used for the URL.">
          <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </Field>
        <Field label="Description" required>
          <Textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Field>
        <Field label="Problem statement" required>
          <Textarea
            rows={3}
            value={form.problem}
            onChange={(e) => setForm({ ...form, problem: e.target.value })}
          />
        </Field>
        <Field label="Your role" required>
          <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        </Field>
        <Field label="Solution" required>
          <Textarea
            rows={4}
            value={form.solution}
            onChange={(e) => setForm({ ...form, solution: e.target.value })}
          />
        </Field>
        <Field label="Tools (comma separated)" required>
          <Input value={form.tools} onChange={(e) => setForm({ ...form, tools: e.target.value })} />
        </Field>
        <Field label="Tech stack (comma separated)" required>
          <Input
            value={form.techStack}
            onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          />
        </Field>
        <Field label="Cover image URL" required>
          <Input
            value={form.coverImage}
            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
            type="url"
            placeholder="https://"
          />
        </Field>
        <Field label="Gallery images (comma separated URLs)">
          <Textarea
            rows={2}
            value={form.gallery}
            onChange={(e) => setForm({ ...form, gallery: e.target.value })}
            placeholder="https://example.com/1, https://example.com/2"
          />
        </Field>
        <Field label="Live demo URL">
          <Input
            value={form.liveUrl}
            onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
            type="url"
            placeholder="https://"
          />
        </Field>
        <Field label="GitHub URL">
          <Input
            value={form.githubUrl}
            onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            type="url"
            placeholder="https://"
          />
        </Field>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Display order">
            <Input
              type="number"
              min="0"
              value={form.order}
              onChange={(e) => setForm({ ...form, order: e.target.value })}
            />
          </Field>
          <ToggleField
            label="Featured"
            checked={form.featured}
            onChange={(checked) => setForm({ ...form, featured: checked })}
          />
          <ToggleField
            label="Published"
            checked={form.published}
            onChange={(checked) => setForm({ ...form, published: checked })}
          />
        </div>
      </form>
    </Drawer>
  );
}

function Field({ label, hint, required, children }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <label className="font-medium text-text">
          {label} {required ? <span className="text-primary">*</span> : null}
        </label>
        {hint ? <span className="text-xs text-muted">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

function ToggleField({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-text cursor-pointer">
      <input
        type="checkbox"
        className="h-4 w-4 accent-primary"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}

