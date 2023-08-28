import { collection, getDocs, where, query } from "firebase/firestore"; 
import { db } from "@/helpers/firebase";

export const getAccount = async({username, password}) => {
    const q = query(collection(db, "account"),
        where("username", "==", username),
        where("password", "==", password)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
    if(querySnapshot.size == 1) {
        return querySnapshot.docs[0].data().id;
    }
    return null;
}