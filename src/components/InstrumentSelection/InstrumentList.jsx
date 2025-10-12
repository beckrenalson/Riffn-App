import InstrumentStore from "../../stores/InstrumentStore";
import { useEffect, useRef } from "react";

function InstrumentList({ instruments, onSelectionChange, initialSelections }) {
    const { selectedInstruments, setSelectedInstruments } = InstrumentStore();
    const hasInitialized = useRef(false);

    useEffect(() => {
        // Only initialize if the store is empty and we have initial selections
        if (selectedInstruments.length === 0 && initialSelections && initialSelections.length > 0) {
            setSelectedInstruments(initialSelections);
        }
    }, []); // Empty dependency array - only run once on mount

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
                    <div className={`rounded-full border-2 p-5 border-gray-500 ${selectedInstruments.includes(instrument.name)
                        ? "bg-gray-800"
                        : "bg-transparent"
                        }`}>
                        <img className="w-16" src={instrument.icon} alt="" style={{ filter: 'invert(1)' }} />
                    </div>
                    <p className="font-bold">{instrument.name}</p>
                </button>
            ))}
        </div>
    );
}

export default InstrumentList;