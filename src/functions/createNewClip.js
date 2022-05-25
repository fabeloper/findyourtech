import { app } from "../firebase/config";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const db = getFirestore(app);

export default async function createNewClip(clipData) {
  const collectionRef = collection(db, "clips");
  const docRef = doc(collectionRef, uuidv4());
  await setDoc(docRef, { ...clipData, createdAt: serverTimestamp() });
}
