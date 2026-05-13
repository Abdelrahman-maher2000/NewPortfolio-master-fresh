'use client';

import { useEffect, useState } from "react";
import { Drawer } from "../ui/drawer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const categories = ["Planning", "Web/Tech", "AI/Automation", "Tools"];

export function SkillForm({ open, onClose, initial, onSave }) {
  const [form, setForm] = useState({ name: "", category: "Planning", order: 0 });

  useEffect(() => {
    if (initial) {
      setForm({ name: initial.name, category: initial.category, order: initial.order ?? 0 });
    } else {
      setForm({ name: "", category: "Planning", order: 0 });
    }
  }, [initial, open]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSave?.(form, initial?.id);
  };

  const footer = (
    <div className="flex items-center gap-3">
      <Button type="submit" form="skill-form">
        Save skill
      </Button>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
    </div>
  );

  return (
    <Drawer open={open} onClose={onClose} title={initial ? "Edit skill" : "Add skill"} footer={footer} width="24rem">
      <form id="skill-form" className="space-y-5" onSubmit={handleSubmit}>
        <Field label="Skill name" required>
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </Field>
        <Field label="Category" required>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <label
                key={category}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition ${
                  form.category === category ? "border-primary bg-primary/5 text-primary" : "border-border text-muted"
                }`}
              >
                <input
                  type="radio"
                  className="accent-primary"
                  checked={form.category === category}
                  onChange={() => setForm({ ...form, category })}
                />
                {category}
              </label>
            ))}
          </div>
        </Field>
        <Field label="Display order">
          <Input
            type="number"
            min="0"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
          />
        </Field>
      </form>
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

