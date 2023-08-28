import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Auth({children}) {
    const router = useRouter();
    const signedInID = Cookies.get("signedInID");
    if(signedInID == null) router.push("/login");
    return children;
}