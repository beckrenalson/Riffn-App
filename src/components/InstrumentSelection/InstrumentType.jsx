import { NavLink } from "react-router"

function InstrumentType({instrumentType, selectInstrument}) {
    return (
        <>
            <NavLink to={selectInstrument} className="cursor-pointer border p-5 w-1/2 flex justify-center">{instrumentType}</NavLink>
        </>
    )
}

export default InstrumentType