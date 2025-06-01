import { NavLink } from "react-router-dom"

function NavBar() {
    return (
        <>
            <nav className="flex justify-around fixed bottom-0 w-full border p-2 bg-white">
                <NavLink to="/search/bands" end className="w-6">
                    <img src="/images/search.png" />
                </NavLink>
                 <NavLink to="/profile" end className="w-6">
                    <img src="/images/circle-user.png" />
                </NavLink>
            </nav>
        </>
    )
}

export default NavBar