import { NavLink } from "react-router"

function InstrumentType({type}) {
    return (
        <>
            <NavLink to={`/instruments/${type}`} className="cursor-pointer border p-4 w-1/2 flex justify-center rounded-lg">{type}</NavLink>
        </>
    )
}

export default InstrumentType