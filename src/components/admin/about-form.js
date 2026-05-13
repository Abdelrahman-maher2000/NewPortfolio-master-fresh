'use client';

import { useEffect, useState } from "react";
import { Drawer } from "../ui/drawer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const emptyAbout = {
  name: "",
  title: "",
  tagline: "",
  bio: "",
  highlights: [],
  profileImage: "",
  email: "",
  linkedin: "",
  github: "",
  cvUrl: "",
};

export function AboutForm({ open, onClose, about, onSave }) {
  const [form, setForm] = useState(emptyAbout);

  useEffect(() => {
    setForm(about || emptyAbout);
  }, [about, open]);

  const updateHighlight = (index, value) => {
    const next = [...form.highlights];
    next[index] = value;
    setForm({ ...form, highlights: next });
  };

  const removeHighlight = (index) => {
    setForm({ ...form, highlights: form.highlights.filter((_, i) => i !== index) });
  };

  const addHighlight = () => {
    setForm({ ...form, highlights: [...(form.highlights || []), ""] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSave?.(form);
  };

  const footer = (
    <div className="flex items-center gap-3">
      <Button type="submit" form="about-form">
        Save changes
      </Button>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
    </div>
  );

  return (
    <Drawer open={open} onClose={onClose} title="Edit about" footer={footer} width="32rem">
      {form ? (
        <form id="about-form" className="space-y-5" onSubmit={handleSubmit}>
          <Field label="Full name" required>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>
          <Field label="Title" required>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Tagline" required>
            <Input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
          </Field>
          <Field label="Bio" required>
            <Textarea
              rows={5}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </Field>
            <div className="space-y-2">
            <div className="text-sm font-medium text-text">Highlights</div>
            <div className="space-y-2">
              {(form.highlights || []).map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={highlight}
                    onChange={(e) => updateHighlight(index, e.target.value)}
                    placeholder="Key achievement"
                  />
                  <Button
                    variant="secondary"
                    className="px-3"
                    type="button"
                    onClick={() => removeHighlight(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="secondary" type="button" onClick={addHighlight} className="px-3">
              Add highlight
            </Button>
          </div>
          <Field label="Profile image URL">
            <Input
              type="url"
              value={form.profileImage || ""}
              onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
              placeholder="https://"
            />
          </Field>
          <Field label="Email" required>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Field>
          <Field label="LinkedIn" required>
            <Input
              type="url"
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/..."
            />
          </Field>
          <Field label="GitHub" required>
            <Input
              type="url"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              placeholder="https://github.com/..."
            />
          </Field>
          <Field label="CV URL">
            <Input
              type="url"
              value={form.cvUrl || ""}
              onChange={(e) => setForm({ ...form, cvUrl: e.target.value })}
              placeholder="https://"
            />
          </Field>
        </form>
      ) : (
        <div className="p-6 text-sm text-muted">Loading...</div>
      )}
    </Drawer>
  );
}

function Field({ label, required, children }) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-text">
        {label} {required ? <span className="text-primary">*</span> : null}
      </div>
      {children}
    </div>
  );
}

