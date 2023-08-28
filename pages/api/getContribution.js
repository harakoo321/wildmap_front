import { collection, getDocs, where, query, orderBy, startAt, endAt } from "firebase/firestore"; 
import { db } from "@/helpers/firebase";
import { geohashQueryBounds } from "geofire-common";

export const getContribution = async(center) => {
    try {
        const q = query(collection(db, "contribution"));
        const querySnapshot = await getDocs(q);
        return querySnapshot
        /*
        //10km以内
        const radiusInM = 10 * 1000;
        const bounds = geohashQueryBounds([center.lat, center.lng], radiusInM);
        const promises = [];
        for (const b of bounds) {
        const q = query(
            collection(db, "contribution"), 
            orderBy("geoHash"), 
            startAt(b[0]), 
            endAt(b[1]));

            promises.push(getDocs(q));
        }

        const querySnapshot = await Promise.all(promises);
        console.log(querySnapshot);
        return querySnapshot[0];
        */
    } catch (e) {
        console.error("Error getting document: ", e);
    }
}