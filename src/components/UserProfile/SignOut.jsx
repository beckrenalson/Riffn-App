import { useNavigate } from "react-router-dom"

function SignOut() {

    const navigate = useNavigate()

    const signOut = () => {
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