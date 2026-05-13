import {
    collection,
    doc,
    getDoc,
    serverTimestamp,
    writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";

export const ENABLE_FIRESTORE_SETUP =
    process.env.NEXT_PUBLIC_ENABLE_FIRESTORE_SETUP !== "false";

function isDev() {
    return process.env.NODE_ENV !== "production";
}

export async function checkInitialized() {
    if (!ENABLE_FIRESTORE_SETUP) {
        return { initialized: true, reason: "flag-disabled" };
    }

    try {
        const metaRef = doc(db, "meta", "system");
        const snapshot = await getDoc(metaRef);
        if (snapshot.exists()) {
            const data = snapshot.data();
            if (data.initialized === true) {
                return {
                    initialized: true,
                    schemaVersion: data.schemaVersion ?? null,
                    data,
                };
            }
        }
        return { initialized: false };
    } catch (error) {
        if (isDev()) console.warn("checkInitialized failed", error);
        throw error;
    }
}

export async function runInitialization(currentUser) {
    if (!ENABLE_FIRESTORE_SETUP) {
        throw new Error("Setup already completed");
    }

    const status = await checkInitialized();
    if (status.initialized) {
        throw new Error("Setup already completed");
    }

    const batch = writeBatch(db);
    const now = serverTimestamp();

    // meta/system
    const metaRef = doc(db, "meta", "system");
    batch.set(metaRef, {
        initialized: true,
        initializedAt: now,
        initializedBy: currentUser
            ? {
                  uid: currentUser.uid || null,
                  email: currentUser.email || null,
              }
            : null,
        schemaVersion: 1,
    });

    // about/content
    const aboutRef = doc(db, "about", "content");
    batch.set(aboutRef, {
        bio: "",
        highlights: [],
        socials: {
            linkedin: "",
            github: "",
            email: "",
        },
        updatedAt: now,
    });

    // sample skill
    const skillRef = doc(collection(db, "skills"));
    batch.set(skillRef, {
        name: "Primavera P6",
        category: "Planning",
        order: 1,
        createdAt: now,
        updatedAt: now,
    });

    // sample project
    const projectRef = doc(collection(db, "projects"));
    batch.set(projectRef, {
        title: "Sample Project",
        slug: "sample-project",
        summary: "",
        details: "",
        stack: ["Next.js", "Firebase"],
        coverImageUrl: "",
        gallery: [],
        links: { demo: "", github: "" },
        featured: false,
        status: "draft",
        order: 1,
        createdAt: now,
        updatedAt: now,
    });

    // sample certificate
    const certificateRef = doc(collection(db, "certificates"));
    batch.set(certificateRef, {
        title: "Sample Certificate",
        provider: "",
        date: "",
        url: "",
        order: 1,
        createdAt: now,
        updatedAt: now,
    });

    await batch.commit();

    return { initialized: true };
}

// Security rules suggestions (not applied automatically):
// - allow public read for collections/documents required by the site;
// - allow writes only for specific admin UID(s);
// - disallow writes to meta/system once initialized == true.
