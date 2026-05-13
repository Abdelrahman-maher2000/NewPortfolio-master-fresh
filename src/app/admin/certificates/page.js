'use client';

import { useEffect, useMemo, useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card } from "../../../components/ui/card";
import { SearchIcon, PlusIcon, EditIcon, TrashIcon } from "../../../components/ui/icons";
import { useToast } from "../../../context/toast-context";
import { CertificateForm } from "../../../components/admin/certificate-form";
import { subscribeToCollection } from "../../../lib/firestoreHooks";
import { db } from "../../../lib/firebase";

export default function AdminCertificatesPage() {
  const { showToast } = useToast();
  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToCollection("certificates", {
      orderBy: "order",
      onData: (items) => {
        setCertificates(items);
        setLoading(false);
      },
      onError: (error) => {
        showToast({ title: "Failed to load certificates", description: error.message, variant: "error" });
        setLoading(false);
      },
    });
    return () => unsubscribe();
  }, [showToast]);

  const filtered = useMemo(() => {
    return certificates
      .filter(
        (cert) =>
          cert.title?.toLowerCase().includes(search.toLowerCase()) ||
          cert.issuer?.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [certificates, search]);

  const handleSaveCertificate = async (form, id) => {
    try {
      if (id) {
        await updateDoc(doc(db, "certificates", id), { ...form, updatedAt: serverTimestamp() });
        showToast({ title: "Certificate updated" });
      } else {
        await addDoc(collection(db, "certificates"), {
          ...form,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        showToast({ title: "Certificate added" });
      }
      setEditing(null);
    } catch (error) {
      showToast({ title: "Save failed", description: error.message, variant: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certificate?")) return;
    try {
      await deleteDoc(doc(db, "certificates", id));
      showToast({ title: "Certificate deleted" });
    } catch (error) {
      showToast({ title: "Delete failed", description: error.message, variant: "error" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-text">Certificates</h1>
          <p className="text-sm text-muted">Keep credentials organized.</p>
        </div>
        <Button onClick={() => setEditing({})}>
          <PlusIcon className="h-4 w-4" />
          Add new
        </Button>
      </div>

      <div className="flex items-center gap-3 max-w-xl">
        <div className="relative flex-1">
          <SearchIcon className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <Input
            placeholder="Search certificates"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <Card key={idx} className="h-24 animate-pulse bg-bg" />
          ))
        ) : filtered.length ? (
          filtered.map((certificate) => (
            <Card key={certificate.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-1">
                <div className="text-lg font-semibold text-text">{certificate.title}</div>
                <div className="text-sm text-muted">{certificate.issuer}</div>
                <div className="text-sm text-muted">
                  {certificate.date
                    ? new Date(certificate.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "No date"}
                </div>
                {certificate.credentialUrl ? (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-primary hover:text-primary-hover"
                  >
                    View credential
                  </a>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" className="px-3" onClick={() => setEditing(certificate)}>
                  <EditIcon className="h-4 w-4" />
                  Edit
                </Button>
                <Button variant="ghost" className="text-red-600" onClick={() => handleDelete(certificate.id)}>
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-muted text-sm">No certificates found.</p>
        )}
      </div>

      <CertificateForm
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        initial={editing || null}
        onSave={(payload) => handleSaveCertificate(payload, editing?.id)}
      />
    </div>
  );
}

