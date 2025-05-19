import { NavLink } from "react-router"

function Instrument({ instruments }) {
    // console.log(instruments)
    return (
        <>
            <NavLink to="" className="">
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