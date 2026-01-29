import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "../firebase";

export const uploadImage = async (file: File, category: string, model: string) => {
  const filePath = `images/${category}/${model}_${file.name}_${Date.now()}`;
  const imageRef = ref(storage, filePath);

  await uploadBytes(imageRef, file);
  const url = await getDownloadURL(imageRef);

  await addDoc(collection(db, "images"), {
    url,
    category,
    model,
    storagePath: filePath, 
    createdAt: serverTimestamp(),
  });
};
