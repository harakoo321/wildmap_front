import { useRouter } from "next/router";
import Cookies from "js-cookie";
import handler from "@/pages/api/hello";

export default function Auth({children}) {
    const router = useRouter();
    const signedInID = Cookies.get("signedInID");

    const clickHandler = () => {
        router.push("/login");
    }

    if(signedInID == null) return (
        <div>
            <p>投稿するにはログインしてください</p>
            <button onClick={clickHandler}>ログイン</button>
        </div>
    );
    return children;
}