import { NavLink } from "react-router"

function Genre({genre}) {
    return (
        <>
            <NavLink to={`/subgenres/${genre}`} className="w-full cursor-pointer border p-4 flex justify-center rounded-lg">{genre}</NavLink>
        </>
    )
}

export default Genre