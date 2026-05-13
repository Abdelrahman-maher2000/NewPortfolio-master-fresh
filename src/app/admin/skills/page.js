'use client';

import { useEffect, useMemo, useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card } from "../../../components/ui/card";
import { SearchIcon, PlusIcon, EditIcon, TrashIcon } from "../../../components/ui/icons";
import { useToast } from "../../../context/toast-context";
import { SkillForm } from "../../../components/admin/skill-form";
import { subscribeToCollection } from "../../../lib/firestoreHooks";
import { auth, db } from "../../../lib/firebase";
import { AuthDialog, handleLogout } from "../../../components/admin/auth-dialog";

const categories = ["Planning", "Web/Tech", "AI/Automation", "Tools"];

export default function AdminSkillsPage() {
  const { showToast } = useToast();
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToCollection("skills", {
      orderBy: "order",
      onData: (items) => {
        setSkills(items);
        setLoading(false);
      },
      onError: (error) => {
        showToast({ title: "Failed to load skills", description: error.message, variant: "error" });
        setLoading(false);
      },
    });
    return () => unsubscribe();
  }, [showToast]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => setUser(fbUser));
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    return skills
      .filter((skill) => skill.name?.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [skills, search]);

  const handleSaveSkill = async (form, id) => {
    try {
      if (id) {
        await updateDoc(doc(db, "skills", id), { ...form, updatedAt: serverTimestamp() });
        showToast({ title: "Skill updated" });
      } else {
        await addDoc(collection(db, "skills"), {
          ...form,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        showToast({ title: "Skill added" });
      }
      setEditing(null);
    } catch (error) {
      showToast({ title: "Save failed", description: error.message, variant: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      await deleteDoc(doc(db, "skills", id));
      showToast({ title: "Skill deleted" });
    } catch (error) {
      showToast({ title: "Delete failed", description: error.message, variant: "error" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-text">Skills</h1>
          <p className="text-sm text-muted">Organize capabilities by category.</p>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="secondary" onClick={() => handleLogout()}>
                Logout
              </Button>
              <Button onClick={() => setEditing({})}>
                <PlusIcon className="h-4 w-4" />
                Add new
              </Button>
            </>
          ) : (
            <Button onClick={() => setAuthOpen(true)}>Login to edit</Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 max-w-xl">
        <div className="relative flex-1">
          <SearchIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <Input
            placeholder="Search skills"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <Card key={idx} className="h-28 animate-pulse bg-bg" />
          ))
        ) : (
          categories.map((category) => {
            const skillsByCategory = filtered.filter((skill) => skill.category === category);
            if (!skillsByCategory.length) return null;
            return (
              <Card key={category} className="space-y-2">
                <div className="font-semibold text-text border-b border-border pb-2">{category}</div>
                <div className="space-y-2">
                  {skillsByCategory.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-bg"
                    >
                      <span className="text-sm text-muted">{skill.name}</span>
                      {user ? (
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" className="px-2" onClick={() => setEditing(skill)}>
                            <EditIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            className="px-2 text-red-600"
                            onClick={() => handleDelete(skill.id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })
        )}
      </div>

      <SkillForm
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        initial={editing || null}
        onSave={(payload) => handleSaveSkill(payload, editing?.id)}
      />

      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} onSuccess={() => setAuthOpen(false)} />
    </div>
  );
}

