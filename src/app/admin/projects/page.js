'use client';

import { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card } from "../../../components/ui/card";
import { SearchIcon, PlusIcon, EditIcon, TrashIcon } from "../../../components/ui/icons";
import { useToast } from "../../../context/toast-context";
import { ProjectForm } from "../../../components/admin/project-form";
import { checkInitialized, runInitialization, ENABLE_FIRESTORE_SETUP } from "../../../lib/firestoreSetup";
import { subscribeToCollection } from "../../../lib/firestoreHooks";
import { auth, db } from "../../../lib/firebase";
import { AuthDialog, handleLogout } from "../../../components/admin/auth-dialog";

export default function AdminProjectsPage() {
  const { showToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [checkingSetup, setCheckingSetup] = useState(true);
  const [initLoading, setInitLoading] = useState(false);
  const [setupStatus, setSetupStatus] = useState({ initialized: true });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const loadStatus = async () => {
      setCheckingSetup(true);
      try {
        const status = await checkInitialized();
        setSetupStatus(status);
      } catch (error) {
        showToast({ title: "Could not check setup", description: error.message, variant: "error" });
      } finally {
        setCheckingSetup(false);
      }
    };

    loadStatus();
  }, [showToast]);

  const handleInit = async () => {
    if (!ENABLE_FIRESTORE_SETUP || setupStatus.initialized) {
      showToast({ title: "Setup already completed" });
      return;
    }

    setInitLoading(true);
    try {
      await runInitialization(null);
      showToast({ title: "Firestore initialized" });
      const status = await checkInitialized();
      setSetupStatus(status);
    } catch (error) {
      showToast({ title: "Initialization failed", description: error.message, variant: "error" });
    } finally {
      setInitLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToCollection("projects", {
      orderBy: "order",
      onData: (items) => {
        setProjects(items);
        setLoading(false);
      },
      onError: (error) => {
        showToast({ title: "Failed to load projects", description: error.message, variant: "error" });
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
    return projects
      .filter((project) => project.title?.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [projects, search]);

  const handleSaveProject = async (payload, id) => {
    try {
      if (id) {
        await updateDoc(doc(db, "projects", id), { ...payload, updatedAt: serverTimestamp() });
        showToast({ title: "Project updated" });
      } else {
        await addDoc(collection(db, "projects"), {
          ...payload,
          status: payload.status || "draft",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        showToast({ title: "Project created" });
      }
      setEditing(null);
    } catch (error) {
      showToast({ title: "Save failed", description: error.message, variant: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await deleteDoc(doc(db, "projects", id));
      showToast({ title: "Project deleted" });
    } catch (error) {
      showToast({ title: "Delete failed", description: error.message, variant: "error" });
    }
  };

  return (
    <div className="space-y-6">
      {!checkingSetup && ENABLE_FIRESTORE_SETUP && !setupStatus.initialized ? (
        <Card className="border border-dashed border-primary/50 bg-primary/5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="space-y-1">
              <div className="text-sm font-semibold text-text">System Setup</div>
              <p className="text-sm text-muted">
                Initialize Firestore with default collections and prevent re-running after completion.
              </p>
            </div>
            <Button onClick={handleInit} disabled={initLoading}>
              {initLoading ? "Initializing..." : "Initialize Firestore"}
            </Button>
          </div>
        </Card>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-text">Projects</h1>
          <p className="text-sm text-muted">Manage featured and published work.</p>
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
            placeholder="Search projects"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <Card key={idx}>
              <div className="animate-pulse h-24 bg-bg rounded" />
            </Card>
          ))
        ) : filtered.length ? (
          filtered.map((project) => (
            <Card key={project.id}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-40 h-24 rounded-lg overflow-hidden bg-bg border border-border">
                  {project.coverImage ? (
                    <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-bg flex items-center justify-center text-muted text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-text">{project.title}</h3>
                    {project.featured ? (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-accent/10 text-accent">Featured</span>
                    ) : null}
                    {project.status === "draft" ? (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-muted/10 text-muted">Draft</span>
                    ) : null}
                  </div>
                  <p className="text-sm text-muted line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(project.techStack || []).slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md border border-border text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                {user ? (
                  <div className="flex items-start gap-2">
                    <Button variant="secondary" className="px-3" onClick={() => setEditing(project)}>
                      <EditIcon className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 border border-transparent hover:border-red-100 px-3"
                      onClick={() => handleDelete(project.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                ) : null}
              </div>
            </Card>
          ))
        ) : (
          <p className="text-muted text-sm">No projects found.</p>
        )}
      </div>

      <ProjectForm
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        initial={editing || null}
        onSave={(payload) => handleSaveProject(payload, editing?.id)}
      />

      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} onSuccess={() => setAuthOpen(false)} />
    </div>
  );
}

