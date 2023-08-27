import { db } from "@/helpers/firebase";
import { addDoc, collection } from "firebase/firestore";

export const addAccount = async({id, username, password}) => {
    try {
        const docRef = await addDoc(collection(db, "account"), {
            id: id,
            username: username,
            password: password,
        });
      
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding account: ", e);
    }
}