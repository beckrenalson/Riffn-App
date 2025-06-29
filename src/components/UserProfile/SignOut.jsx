import { useNavigate } from "react-router-dom"
import SignUpStore from "../CreateProfile/SignUpStore";

function SignOut() {

    const navigate = useNavigate()

    const signOut = () => {
        localStorage.removeItem("riffn-user-storage");
        SignUpStore.getState().resetSignUpData()
        navigate("/")
    }

    return (
        <>
            <button
                onClick={signOut}
                className="border rounded-4xl p-2 cursor-pointer"
            >Sign out
            </button>
        </>
    )
}

export default SignOut