import { app } from "../firebase/config";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";

const db = getFirestore(app);

export default async function getAllClips() {
  const clips = [];
  const collectionRef = collection(db, "clips");
  const queryDate = query(collectionRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(queryDate);
  snapshot.forEach((doc) => {
    clips.push(doc.data());
  });
  return clips;
}
