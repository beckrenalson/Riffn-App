import BackBtn from "./components/BackBtn"
import { useLocation, useNavigate } from "react-router-dom"
import SignUp from "./components/CreateProfile/SignUp";

function UserSelection() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleSelect = (profileType) => {

        navigate("/signup/instruments", {
            state: {
                ...location.state.signUpData,
                profile: profileType
            }
        });
    };

    return (
        <>
            <BackBtn />
            <div className="flex flex-col gap-20 mt-20">
                <button onClick={() => handleSelect("solo")} className="flex flex-col items-center">
                    <div className="rounded-full border-3 p-10">
                        <img
                            className="w-30"
                            src="/images/soloartist.png" />
                    </div>
                    <p className="font-bold">Solo Musician</p>
                </button>
                <button onClick={() => handleSelect("band")} className="flex flex-col items-center">
                    <div className="rounded-full border-3 p-10">
                        <img
                            className="w-30"
                            src="/images/band.png" />
                    </div>
                    <p className="font-bold">Band</p>
                </button>
            </div>
        </>
    )
}

export default UserSelection