import { useNavigate } from "react-router-dom";
import BackBtn from "./components/BackBtn"
import SignUpStore from "./components/CreateProfile/SignUpStore";

function UserSelection() {
    const navigate = useNavigate();
    const signUpData = SignUpStore((state) => state.signUpData);
    const setSignUpData = SignUpStore((state) => state.setSignUpData);

    console.log(signUpData)

    const handleSelect = (profileType) => {
        setSignUpData({ profileType })
        navigate("/signup/instruments");
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