import { useState } from "react";
import { NavLink } from "react-router";

function InstrumentList({ instruments }) {
    const [selectedInstrument, setSelectedInstrument] = useState([]);

    const toggleSelection = (index) => {
        setSelectedInstrument((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((i) => i !== index)
                : [...prevSelected, index]
        );
    };

    return (
        <div className="grid grid-cols-3 gap-2 p-2">
            {instruments.map((instrument, index) => (
                <NavLink
                    to=""
                    key={index}
                    onClick={() => toggleSelection(index)}
                    className="flex flex-col items-center p-2"
                >
                    <div className={`rounded-full border-2 p-5 transition-colors ${selectedInstrument.includes(index)
                        ? "bg-blue-400"
                        : "bg-transparent"
                        }`}>
                        <img className="w-16" src={instrument.icon} alt="" />
                    </div>
                    <p className="font-bold">{instrument.name}</p>
                </NavLink>
            ))}
        </div>
    );
}

export default InstrumentList;