import { db } from "@/helpers/firebase";
import { addDoc, collection } from "firebase/firestore";
import { GeoPoint } from "firebase/firestore";

export const addContribution = async({ name, position, dangerLevel, imagePath, comment }) => {
    try {
        const docRef = await addDoc(collection(db, "contribution"), {
            name: name,
            position: position,
            dangerLevel: dangerLevel,
            imagePath: imagePath,
            comment: comment,
            geoPoint: new GeoPoint(position[0], position[1])
        });
      
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
      
}