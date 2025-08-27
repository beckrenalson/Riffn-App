import InstrumentList from "./InstrumentList"
import BackBtn from "../BackBtn"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import UserStore from "../../stores/UserStore";
import api, { INSTRUMENTS_ENDPOINT } from "../../services/api"; // Import api and INSTRUMENTS_ENDPOINT
import Loading from "../Loading";

function InstrumentSelection() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const from = searchParams.get("from");
    const userData = UserStore((state) => state.userData);
    const setUserData = UserStore((state) => state.setUserData);
    const [selectedInstruments, setSelectedInstruments] = useState(userData.selectedInstruments || []);
    const [loading, setLoading] = useState(false);


    const handleContinue = () => {
        if (from === "edit") {
            UserStore.getState().setIsEditing(true);
            navigate("/profile", { state: { stayEditing: true, selectedInstruments } });
        } else {
            setUserData({
                ...userData,
                selectedInstruments
            })
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
                    const response = await api.get(`${INSTRUMENTS_ENDPOINT}/${type}`); // Use api.get
                    const data = response.data;
                    setInstrumentList(data)
                } finally {
                    setLoading(false)
                }
            }
            getInstruments();
        }
    }, [type])

    useEffect(() => {
        // Cleanup function to revert selectedInstruments in UserStore if back button is used
        return () => {
            // No longer needed as continueClicked is removed
        };
    }, []);

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
                            initialSelections={selectedInstruments}
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