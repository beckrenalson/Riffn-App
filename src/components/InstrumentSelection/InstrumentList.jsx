import { useState } from "react";

function InstrumentList({ instruments, onSelectionChange }) {

    const [selectedInstruments, setSelectedInstruments] = useState([]);

    const toggleSelection = (instrumentName) => {
        const updatedSelection = selectedInstruments.includes(instrumentName)
            ? selectedInstruments.filter((name) => name !== instrumentName)
            : [...selectedInstruments, instrumentName]

        setSelectedInstruments(updatedSelection);
        onSelectionChange(updatedSelection);
    };

    return (
        <div className="grid grid-cols-3 gap-2 p-2">
            {instruments.map((instrument, index) => (
                <button
                    key={index}
                    onClick={() => toggleSelection(instrument.name)}
                    className="flex flex-col items-center p-2"
                >
                    <div className={`rounded-full border-2 p-5 transition-colors ${selectedInstruments.includes(instrument.name)
                        ? "bg-purple-400"
                        : "bg-transparent"
                        }`}>
                        <img className="w-16" src={instrument.icon} alt="" style={{ filter: 'invert(1)' }}/>
                    </div>
                    <p className="font-bold">{instrument.name}</p>
                </button>
            ))}
        </div>
    );
}

export default InstrumentList;