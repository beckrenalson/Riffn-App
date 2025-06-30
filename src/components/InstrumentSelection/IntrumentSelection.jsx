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
            navigate("/profile");   // or your profile route
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