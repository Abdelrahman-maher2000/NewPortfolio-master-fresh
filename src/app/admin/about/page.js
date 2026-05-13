'use client';

import { useEffect, useState } from "react";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { EditIcon } from "../../../components/ui/icons";
import { AboutForm } from "../../../components/admin/about-form";
import { subscribeToDocument } from "../../../lib/firestoreHooks";
import { auth, db } from "../../../lib/firebase";
import { useToast } from "../../../context/toast-context";

export default function AdminAboutPage() {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => setUser(fbUser));
    return () => unsub();
  }, []);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToDocument("about/content", {
      onData: (data) => {
        setAbout(data);
        setLoading(false);
      },
      onError: (error) => {
        showToast({ title: "Failed to load about", description: error.message, variant: "error" });
        setLoading(false);
      },
    });
    return () => unsubscribe();
  }, [showToast]);

  const handleSave = async (form) => {
    try {
      await updateDoc(doc(db, "about", "content"), {
        ...form,
        updatedAt: serverTimestamp(),
      });
      showToast({ title: "About updated" });
      setOpen(false);
    } catch (error) {
      showToast({ title: "Save failed", description: error.message, variant: "error" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-text">About</h1>
          <p className="text-sm text-muted">Update your bio, contact, and highlights.</p>
        </div>
        <Button onClick={() => (user ? setOpen(true) : null)} disabled={!user}>
          <EditIcon className="h-4 w-4" />
          {user ? "Edit" : "Login to edit"}
        </Button>
      </div>

      <Card className="space-y-4">
        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-bg rounded" />
            <div className="h-4 bg-bg rounded" />
            <div className="h-4 bg-bg rounded" />
          </div>
        ) : about ? (
          <>
            <div>
              <div className="text-sm text-muted">Name</div>
              <div className="font-semibold text-text">{about.name}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Title</div>
              <div className="font-semibold text-text">{about.title}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Tagline</div>
              <div className="text-text">{about.tagline}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Bio</div>
              <p className="text-muted leading-relaxed">{about.bio}</p>
            </div>
            <div>
              <div className="text-sm text-muted">Highlights</div>
              <ul className="list-disc list-inside text-muted space-y-1">
                {(about.highlights || []).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Email" value={about.email} />
              <Field label="LinkedIn" value={about.linkedin} />
              <Field label="GitHub" value={about.github} />
              {about.cvUrl ? <Field label="CV URL" value={about.cvUrl} /> : null}
            </div>
          </>
        ) : (
          <p className="text-sm text-muted">No about information found.</p>
        )}
      </Card>

      <AboutForm open={open} onClose={() => setOpen(false)} about={about} onSave={handleSave} />
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-sm text-muted">{label}</div>
      <div className="text-text font-medium break-all">{value}</div>
    </div>
  );
}

