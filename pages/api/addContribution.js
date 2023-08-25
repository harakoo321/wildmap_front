import { db } from "@/helpers/firebase";
import { addDoc, collection } from "firebase/firestore";

export const addContribution = async(json) => {
    try {
        const docRef = await addDoc(collection(db, "contribution"), json);
      
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
      
}