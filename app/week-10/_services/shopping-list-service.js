import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

export async function getItems(userId) {
  if (!userId) return [];
  const itemsCol = collection(db, "users", userId, "items");
  const snapshot = await getDocs(itemsCol);
  const items = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return items;
}

export async function addItem(userId, item) {
  if (!userId) throw new Error("User ID is required");
  const itemsCol = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsCol, item);
  return docRef.id;
}

export async function deleteItem(userId, itemId) {
  if (!userId || !itemId) throw new Error("User ID and item ID are required");
  const itemDocRef = doc(db, "users", userId, "items", itemId);
  await deleteDoc(itemDocRef);
}

