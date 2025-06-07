import { useNavigate } from "react-router-dom";

function InstrumentType({ type }) {
    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate(`/signup/instruments/${type}`)
    }

    return (
        <>
            <button
                onClick={handleSubmit}
                className="cursor-pointer border p-4 w-1/2 flex justify-center rounded-lg">
                <p>{type}</p>
            </button>

        </>
    )
}

export default InstrumentType