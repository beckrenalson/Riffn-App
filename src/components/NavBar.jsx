import { useNavigate } from "react-router-dom"
import SignUpStore from "./CreateProfile/SignUpStore"

function NavBar() {
    const userData = SignUpStore((state) => state.signUpData);

    const navigate = useNavigate()

    const search = () => {
        if (userData.profileType === "solo") {
            navigate("/search/band")
        } else {
            navigate("/search/solo")
        }
    }

    return (
        <>
            <nav className="flex justify-around fixed bottom-0 w-full border p-2 bg-white">
                <button
                    onClick={search}
                    className="w-6">
                    <img src="/images/search.png" />
                </button>
                <button
                    onClick={() => navigate("/profile")}
                    className="w-6">
                    <img src="/images/circle-user.png" />
                </button>
            </nav>
        </>
    )
}

export default NavBar