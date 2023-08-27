import { collection, getDocs, where, query,  } from "firebase/firestore"; 
import { db } from "@/helpers/firebase";

export const getContribution = async(center) => {
    try {
        const q = query(collection(db, "contribution"), 
            where('position', '>=', [center.lat - 0.05, center.lng - 0.05]), 
            where('position', '<=', [center.lat + 0.05, center.lng + 0.05])
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } catch (e) {
        console.error("Error getting document: ", e);
    }
}