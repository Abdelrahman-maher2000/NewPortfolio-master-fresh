'use client';

import { useEffect, useState } from "react";
import { Drawer } from "../ui/drawer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function CertificateForm({ open, onClose, initial, onSave }) {
  const [form, setForm] = useState({
    title: "",
    issuer: "",
    date: "",
    credentialUrl: "",
    order: 0,
  });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title,
        issuer: initial.issuer,
        date: initial.date || "",
        credentialUrl: initial.credentialUrl || "",
        order: initial.order ?? 0,
      });
    } else {
      setForm({ title: "", issuer: "", date: "", credentialUrl: "", order: 0 });
    }
  }, [initial, open]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSave?.(form, initial?.id);
  };

  const footer = (
    <div className="flex items-center gap-3">
      <Button type="submit" form="certificate-form">
        Save certificate
      </Button>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
    </div>
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={initial ? "Edit certificate" : "Add certificate"}
      footer={footer}
      width="24rem"
    >
      <form id="certificate-form" className="space-y-5" onSubmit={handleSubmit}>
        <Field label="Title" required>
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </Field>
        <Field label="Issuer" required>
          <Input value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} />
        </Field>
        <Field label="Date issued" required>
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </Field>
        <Field label="Credential URL">
          <Input
            type="url"
            placeholder="https://"
            value={form.credentialUrl}
            onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
          />
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

