import { useLocation, useNavigate } from "react-router-dom"

function Genre({ genre }) {
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = () => {
        navigate(`/signup/genres/${genre}`, {
            state: {
                ...location.state.signUpData
            }
        })
    }

    console.log(location.state)

    return (
        <>
            <button
                className="w-full cursor-pointer border p-4 flex justify-center rounded-lg"
                onClick={handleSubmit}
            >{genre}</button>
        </>
    )
}

export default Genre