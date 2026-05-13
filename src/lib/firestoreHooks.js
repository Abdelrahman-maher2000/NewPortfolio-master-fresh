import { collection, doc, onSnapshot, query, orderBy as fbOrderBy } from "firebase/firestore";
import { db } from "./firebase";

const dev = process.env.NODE_ENV !== "production";

export function subscribeToCollection(collectionName, { orderBy, onData, onError }) {
  const colRef = collection(db, collectionName);
  const q = orderBy ? query(colRef, fbOrderBy(orderBy)) : colRef;
  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      onData?.(items);
    },
    (error) => {
      if (dev) console.warn("subscribeToCollection error", collectionName, error);
      onError?.(error);
    }
  );
  return unsubscribe;
}

export function subscribeToDocument(docPath, { onData, onError }) {
  const segments = docPath.split("/").filter(Boolean);
  const docRef = doc(db, ...segments);
  const unsubscribe = onSnapshot(
    docRef,
    (snapshot) => {
      onData?.(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null);
    },
    (error) => {
      if (dev) console.warn("subscribeToDocument error", docPath, error);
      onError?.(error);
    }
  );
  return unsubscribe;
}