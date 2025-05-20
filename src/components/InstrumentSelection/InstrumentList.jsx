import { NavLink } from "react-router"

function Instrument({ instruments }) { 
    return (
        <>
            <NavLink to="" className="grid grid-cols-3 gap-2 p-2">
                {instruments.map((instrument, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="rounded-full border-3 p-5">
                            <img
                                className="w-16"
                                src={instrument.instrumentIcon}
                            />
                        </div>
                        <p className="font-bold">{instrument.instrumentName}</p>
                    </div>
                ))}
            </NavLink>
        </>
    )
}

export default Instrument