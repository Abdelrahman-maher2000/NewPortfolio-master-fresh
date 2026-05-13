'use client';

import { useRouter } from "next/navigation";
import { AdminTopbar } from "../../components/admin/topbar";
import { usePortfolio } from "../../context/portfolio-context";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { AuthDialog, handleLogout as authSignOut } from "../../components/admin/auth-dialog";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const { resetData } = usePortfolio();
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);

  useState(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => setUser(fbUser));
    return () => unsub();
  });

  const handleLogout = async () => {
    await authSignOut();
    resetData();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-bg">
      <AdminTopbar
        onLogout={handleLogout}
        onLogin={() => setAuthOpen(true)}
        isAuthed={!!user}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      <AuthDialog open={authOpen} onClose={() => setAuthOpen(false)} onSuccess={() => setAuthOpen(false)} />
    </div>
  );
}

