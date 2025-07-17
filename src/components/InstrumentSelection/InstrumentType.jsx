import { useNavigate } from "react-router-dom";
import InstrumentStore from "./InstrumentStore";
import SignUpStore from "../CreateProfile/SignUpStore";

function InstrumentType({ type }) {
    const navigate = useNavigate();
    const selectedInstruments = InstrumentStore((state) => state.selectedInstruments || []);
    const instrumentList = InstrumentStore((state) => state.instrumentList || []);
    const isEditing = SignUpStore((state) => state.isEditing);

    // Build a lookup map: name → type
    const instrumentTypeMap = instrumentList.reduce((acc, inst) => {
        acc[inst.name] = inst.type;
        return acc;
    }, {});

    // Count how many selected instruments match this type
    const count = selectedInstruments.filter(
        (name) => instrumentTypeMap[name] === type
    ).length;

    const handleSubmit = () => {
        const url = isEditing
            ? `/signup/instruments/${type}?from=edit`
            : `/signup/instruments/${type}`;
        navigate(url);
    };

    return (
        <button
            onClick={handleSubmit}
            className="w-full text-white border border-gray-500 rounded-xl p-4 flex justify-between items-center"
        >
            <span className="text-lg font-medium tracking-wide">{type}</span>
            {count > 0 && (
                <span className="bg-white text-black text-sm font-semibold px-2 py-1 rounded-full">
                    {count}
                </span>
            )}
        </button>
    );
}

export default InstrumentType;
