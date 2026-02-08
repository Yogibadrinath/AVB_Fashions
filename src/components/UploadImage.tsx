import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "../firebase";

export const uploadImage = async (file: File, category: string, model: string, cost: string) => {
  const filePath = `images/${category}/${model}_${Date.now()}_${file.name}`;
  const imageRef = ref(storage, filePath);

  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);

  await addDoc(collection(db, "images"), {
    url,
    category,
    model,
    cost,
    storagePath: filePath, 
    createdAt: serverTimestamp(),
  });
};
