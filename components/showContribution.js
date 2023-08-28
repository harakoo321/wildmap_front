import { doc, getDoc } from "firebase/firestore"; 
import { db } from "@/helpers/firebase";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Contribution(props) {
    const [docSnap, setDogSnap] = useState(null);
    const getContents = async() => {
        try {
            console.log(props.document_id);
            const docRef = doc(db, "contribution", props.document_id);
            const snap = await getDoc(docRef);
            console.log(snap.data());
            setDogSnap(snap);
            props.setCenter({ lat: snap.data().position[0], lng: snap.data().position[1] });
        } catch (e) {
            console.error("Error getting document: ", e);
        }
    }

    useEffect(() => {
        if(props.document_id != null) getContents();
    }, []);

    if(docSnap == null){
        return <></>
    }
    return (
        <div className="container alert alert-primary h5 text-primary">
            <table className="table h6">
                <tbody>
                    <tr><th>名前</th><td>{docSnap.data().name}</td></tr>
                    <tr><th>危険度</th><td>{docSnap.data().dangerLevel}</td></tr>
                    <tr><th>コメント</th><td>{docSnap.data().comment}</td></tr>
                    <tr><th>写真</th><td>{}</td></tr>
                </tbody>
            </table>
            <div style={{position: "relative", width: "100%", height: 150}}>
                <Image src={docSnap.data().imagePath} layout="fill" objectFit="contain" alt="Image" />
            </div>
        </div>
    )
}