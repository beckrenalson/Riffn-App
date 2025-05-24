import { NavLink } from "react-router"

function InstrumentType({instrumentType}) {
    return (
        <>
            <NavLink to={instrumentType} className="cursor-pointer border p-4 w-1/2 flex justify-center rounded-lg">{instrumentType}</NavLink>
        </>
    )
}

export default InstrumentType