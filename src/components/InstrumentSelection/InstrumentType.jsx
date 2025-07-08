import { useNavigate } from "react-router-dom";
import SignUpStore from "../CreateProfile/SignUpStore";

function InstrumentType({ type }) {
    const navigate = useNavigate();
    const isEditing = SignUpStore((state) => state.isEditing);

    const handleSubmit = () => {
        const url = isEditing
            ? `/signup/instruments/${type}?from=edit`
            : `/signup/instruments/${type}`;
        navigate(url);
    };

    return (
        <button
            onClick={handleSubmit}
            className="w-full text-white border border-gray-500 rounded-xl p-4 flex justify-center items-center"
        >
            <span className="text-lg font-medium tracking-wide">{type}</span>
        </button>
    );
}

export default InstrumentType;
