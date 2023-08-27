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
        } catch (e) {
            console.error("Error getting document: ", e);
        }
    }

    useEffect(() => {
        getContents();
    }, []);

    if(docSnap == null){
        return <p></p>
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
            <Image src={docSnap.data().imagePath} width={600} height={600} alt="Image" />
        </div>
    )
}