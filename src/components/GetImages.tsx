import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit
} from "firebase/firestore";
import { db } from "../firebase";

export const getAllImages = async (): Promise<string[]> => {
  const q = query(
    collection(db, "images"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    doc => doc.data().url as string
  );
};

export interface ProductImage {
  id: string;
  url: string;
  storagePath: string;
  category: string;
  model: string;
  cost: string;
}

export const getImagesByCategory = async (
  category: string
): Promise<ProductImage[]> => {
  const q = query(
    collection(db, "images"),
    where("category", "==", category),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<ProductImage, "id">),
  }));
};


export const getTopImages = async (): Promise<ProductImage[]> => {
  const q = query(
    collection(db, "images"),
    orderBy("createdAt", "desc"),
    limit(5)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<ProductImage, "id">),
  }));
};