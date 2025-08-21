import { useNavigate } from "react-router-dom";
import BackBtn from "../BackBtn";
import UserStore from "../../stores/UserStore";

function UserSelection() {
    const navigate = useNavigate();
    const setUserData = UserStore((state) => state.setUserData);

    const handleSelect = (profileType) => {
        setUserData({ profileType })
        navigate("/signup/createuser");
    };

    return (
        <>
            <BackBtn />
            <div className="flex flex-col gap-20 mt-10">
                <button onClick={() => handleSelect("solo")} className="flex flex-col items-center">
                    <div className="rounded-full border-3 p-10">
                        <img
                            className="w-30"
                            src="/images/soloartist.png"
                            style={{ filter: 'invert(1)' }}
                        />
                    </div>
                    <p className="font-bold text-3xl">Solo Musician</p>
                </button>
                <button onClick={() => handleSelect("band")} className="flex flex-col items-center">
                    <div className="rounded-full border-3 p-10">
                        <img
                            className="w-30"
                            src="/images/band.png"
                            style={{ filter: 'invert(1)' }}
                        />
                    </div>
                    <p className="font-bold text-3xl">Band</p>
                </button>
            </div>
        </>
    )
}

export default UserSelection