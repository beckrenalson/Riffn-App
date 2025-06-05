import InstrumentList from "./InstrumentList"
import BackBtn from "../BackBtn"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function InstrumentSelection() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedInstruments, setSelectedInstruments] = useState([]);

    console.log("location.state:", location.state)
    console.log("signUpData:", location.state?.signUpData)
    console.log("selectedInstruments:", selectedInstruments)

    const handleContinue = () => {
        navigate("/signup/genres", {
            state: {
                ...location.state.signUpData,
                selectedInstruments: selectedInstruments,
            },
        });
    };

    let { type } = useParams()

    const [instrumentList, setInstrumentList] = useState([])

    useEffect(() => {
        if (instrumentList.length === 0) {
            const getInstruments = async () => {
                const response = await fetch(`http://localhost:5000/instruments/${type}`);
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