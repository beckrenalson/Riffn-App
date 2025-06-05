import { useNavigate, useLocation } from "react-router-dom";

function InstrumentType({ type }) {

    const navigate = useNavigate()
    const location = useLocation();

    console.log(location.state)

    const handleSubmit = () => {
        navigate(`/signup/instruments/${type}`, {
            state: { ...location.state.signUpData }
        })
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