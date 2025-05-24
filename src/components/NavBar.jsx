import { NavLink } from "react-router"

function NavBar() {
    return (
        <>
            <nav className="flex justify-around fixed bottom-0 w-full border p-2 bg-blue-400">
                <NavLink to="/search" end className="w-10">
                    <img src="/images/search.png" />
                </NavLink>
                 <NavLink to="/profile" end className="w-10">
                    <img src="/images/circle-user.png" />
                </NavLink>
            </nav>
        </>
    )
}

export default NavBar