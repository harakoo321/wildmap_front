import { db } from "@/helpers/firebase";
import { addDoc, collection } from "firebase/firestore";
import { GeoPoint } from "firebase/firestore";
import { geohashForLocation } from "geofire-common";

export const addContribution = async({ id, name, position, dangerLevel, imagePath, comment }) => {
    try {
        const hash = geohashForLocation(position);
        const docRef = await addDoc(collection(db, "contribution"), {
            id: id,
            name: name,
            position: position,
            dangerLevel: dangerLevel,
            imagePath: imagePath,
            comment: comment,
            geoPoint: new GeoPoint(position[0], position[1]),
            geoHash: hash
        });
      
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
      
}