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
            <nav className="fixed bottom-0 w-full bg-[#121212]/80 backdrop-blur border-t border-gray-800 px-6 py-3 flex justify-around items-center z-50">

                <button
                    onClick={search}
                    className="flex flex-col items-center text-gray-400 hover:text-white transition">
                    <img src="/images/search.png" alt="Search" className="w-6 h-6 mb-1" style={{ filter: 'invert(1)' }} />
                    <span className="text-xs">Search</span>
                </button>

                <button
                    onClick={() => navigate("/profile")}
                    className="flex flex-col items-center text-gray-400 hover:text-white transition">
                    <img src="/images/circle-user.png" alt="Profile" className="w-6 h-6 mb-1" style={{ filter: 'invert(1)' }} />
                    <span className="text-xs">Profile</span>
                </button>
            </nav>
        </>

    )
}

export default NavBar