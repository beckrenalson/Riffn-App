import InstrumentList from "./InstrumentList"
import BackBtn from "../BackBtn"
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SignUpStore from "../CreateProfile/SignUpStore";

function InstrumentSelection() {
    const API_URL = import.meta.env.VITE_RIFFN_API;


    const navigate = useNavigate();
    const signUpData = SignUpStore((state) => state.signUpData);
    const setSignUpData = SignUpStore((state) => state.setSignUpData);
    const [selectedInstruments, setSelectedInstruments] = useState([]);

    const handleContinue = () => {
        setSignUpData({
            ...signUpData,
            selectedInstruments
        })
        navigate("/signup/genres")
    };

    let { type } = useParams()

    const [instrumentList, setInstrumentList] = useState([])

    useEffect(() => {
        if (instrumentList.length === 0) {
            const getInstruments = async () => {
                const response = await fetch(`${API_URL}/instruments/${type}`);
                const data = await response.json();
                setInstrumentList(data)
            }
            getInstruments();
        }
    }, [type])

    return (
        <>
            <BackBtn />
            <div className="flex flex-col items-center">
                <div className="flex justify-center mt-10">
                    {instrumentList.length > 0 && <InstrumentList
                        instruments={instrumentList} onSelectionChange={setSelectedInstruments}
                    />}
                </div>
                <button
                    className="border rounded w-fit p-2 mt-20"
                    onClick={handleContinue}
                    disabled={selectedInstruments.length === 0}>
                    Continue
                </button>
            </div>
        </>
    )
}

export default InstrumentSelection