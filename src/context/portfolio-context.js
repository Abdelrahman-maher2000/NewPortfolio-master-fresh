'use client';

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";

const PortfolioContext = createContext(null);

const emptyAbout = {
  name: "",
  title: "",
  tagline: "",
  bio: "",
  highlights: [],
  email: "",
  linkedin: "",
  github: "",
  cvUrl: "",
  profileImage: "",
};

const emptyData = {
  about: emptyAbout,
  skills: [],
  projects: [],
  certificates: [],
};

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(emptyData);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loaded = { about: false, skills: false, projects: false, certificates: false };

    const markLoaded = (key) => {
      loaded[key] = true;
      if (loaded.about && loaded.skills && loaded.projects && loaded.certificates) {
        setReady(true);
      }
    };

    const aboutUnsub = onSnapshot(
      doc(db, "about", "content"),
      (snap) => {
        if (snap.exists()) {
          const docData = snap.data();
          const socials = docData.socials || {};
          setData((prev) => ({
            ...prev,
            about: {
              ...emptyAbout,
              ...docData,
              email: docData.email || socials.email || "",
              linkedin: docData.linkedin || socials.linkedin || "",
              github: docData.github || socials.github || "",
            },
          }));
        }
        markLoaded("about");
      },
      () => markLoaded("about")
    );

    const skillsUnsub = onSnapshot(
      query(collection(db, "skills"), orderBy("order")),
      (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setData((prev) => ({ ...prev, skills: items }));
        markLoaded("skills");
      },
      () => markLoaded("skills")
    );

    const projectsUnsub = onSnapshot(
      query(collection(db, "projects"), orderBy("order")),
      (snap) => {
        const items = snap.docs.map((d) => {
          const item = d.data();
          return {
            id: d.id,
            ...item,
            coverImage: item.coverImage || item.coverImageUrl || "",
            techStack: item.techStack || item.stack || [],
          };
        });
        setData((prev) => ({ ...prev, projects: items }));
        markLoaded("projects");
      },
      () => markLoaded("projects")
    );

    const certsUnsub = onSnapshot(
      query(collection(db, "certificates"), orderBy("order")),
      (snap) => {
        const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setData((prev) => ({ ...prev, certificates: items }));
        markLoaded("certificates");
      },
      () => markLoaded("certificates")
    );

    return () => {
      aboutUnsub();
      skillsUnsub();
      projectsUnsub();
      certsUnsub();
    };
  }, []);

  const value = useMemo(
    () => ({
      data,
      ready,
    }),
    [data, ready]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return ctx;
}

