import { useNavigate } from "react-router-dom"
import SignUpStore from "../CreateProfile/SignUpStore"

function Genre({ genre }) {
    const navigate = useNavigate()
    const isEditing = SignUpStore((state) => state.isEditing);

    const handleSubmit = () => {
        const url = isEditing
            ? `/signup/genres/${genre}?from=edit`
            : `/signup/genres/${genre}`;
        navigate(url);
    };

    return (
        <>
            <button
                onClick={handleSubmit}
                className="w-full text-white border border-gray-500 rounded-xl p-4 flex justify-center items-center"
            >
                <span className="text-lg font-medium tracking-wide">{genre}</span>
            </button>
        </>
    )
}

export default Genre