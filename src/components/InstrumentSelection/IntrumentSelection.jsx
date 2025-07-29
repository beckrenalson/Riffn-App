import InstrumentList from "./InstrumentList"
import BackBtn from "../BackBtn"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUpStore from "../CreateProfile/SignUpStore";
import { INSTRUMENTS_ENDPOINT } from "../../config/api";
import Loading from "../Loading";

function InstrumentSelection() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const from = searchParams.get("from");
    const signUpData = SignUpStore((state) => state.signUpData);
    const setSignUpData = SignUpStore((state) => state.setSignUpData);
    const [selectedInstruments, setSelectedInstruments] = useState(signUpData.selectedInstruments || []);
    const [loading, setLoading] = useState(false);

    const handleContinue = () => {
        setSignUpData({
            ...signUpData,
            selectedInstruments
        })
        if (from === "edit") {
            SignUpStore.getState().setIsEditing(true);
            navigate("/profile", { state: { stayEditing: true, selectedInstruments } });
        } else {
            navigate("/signup/genres");
        }
    };

    let { type } = useParams()

    const [instrumentList, setInstrumentList] = useState([])

    useEffect(() => {
        if (instrumentList.length === 0) {
            const getInstruments = async () => {
                setLoading(true)
                try {
                    const response = await fetch(`${INSTRUMENTS_ENDPOINT}/${type}`);
                    const data = await response.json();
                    setInstrumentList(data)
                } finally {
                    setLoading(false)
                }
            }
            getInstruments();
        }
    }, [type])

    if (loading) {
        return (
            <Loading />
        );
    }


    return (
        <>
            <BackBtn />
            <div className="flex flex-col items-center px-4">
                <div className="flex justify-center mt-10 w-full max-w-2xl">
                    {instrumentList.length > 0 && (
                        <InstrumentList
                            instruments={instrumentList}
                            onSelectionChange={setSelectedInstruments}
                        />
                    )}
                </div>

                <button
                    onClick={handleContinue}
                    disabled={selectedInstruments.length === 0}
                    className={`w-full max-w-md mt-10 border p-2 rounded-2xl cursor-pointer transition 
          ${selectedInstruments.length === 0
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-black text-white hover:bg-gray-800 cursor-pointer"}`}
                >
                    Continue
                </button>
            </div>
        </>
    );

}

export default InstrumentSelection