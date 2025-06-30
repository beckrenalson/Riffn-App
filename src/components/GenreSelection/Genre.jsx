import { useNavigate } from "react-router-dom"

function Genre({ genre }) {
    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate(`/signup/genres/${genre}?from=edit`)
    }

    return (
        <>
            <button
                onClick={handleSubmit}
                className="w-full text-white bg-[#1e1e1e] border border-gray-700 rounded-xl p-4 shadow-md hover:bg-[#2a2a2a] hover:shadow-lg transition-all duration-200 flex justify-center items-center"
            >
                <span className="text-lg font-medium tracking-wide">{genre}</span>
            </button>
        </>
    )
}

export default Genre