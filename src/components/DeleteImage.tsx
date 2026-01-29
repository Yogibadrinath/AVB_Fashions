import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../firebase";

export const deleteImage = async (
  docId: string,
  storagePath: string
) => {
  // 1. delete from storage
  const imageRef = ref(storage, storagePath);
  await deleteObject(imageRef);

  // 2. delete firestore document
  await deleteDoc(doc(db, "images", docId));
};
