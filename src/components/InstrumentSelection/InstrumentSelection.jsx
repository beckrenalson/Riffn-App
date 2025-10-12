import InstrumentList from "./InstrumentList"
import BackBtn from "../BackBtn"
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import UserStore from "../../stores/UserStore";
import api, { INSTRUMENTS_ENDPOINT } from "../../services/api";
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
                    const response = await api.get(`${INSTRUMENTS_ENDPOINT}/${type}`);
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
        return () => {
            // Cleanup if needed
        };
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Animated background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-violet-950/20 via-zinc-950 to-blue-950/20 pointer-events-none"></div>

            {/* Navigation */}
            <div className="relative z-10">
                <div className="px-6 py-4">
                    <BackBtn />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center px-4 pt-6 pb-24">
                <div className="w-full max-w-2xl space-y-6">

                    {/* Title Section */}
                    <div className="text-center space-y-2">
                        <h1 className="text-xl font-semibold text-zinc-100 tracking-tight">
                            {userData.profileType === "band" ? "Instruments Needed" : "Select Your Instruments"}
                        </h1>
                        <p className="text-zinc-400 text-sm">
                            Choose the instruments you {userData.profileType === "band" ? "need for your band" : "play"}
                        </p>
                    </div>

                    {/* Instrument List Section */}
                    {instrumentList.length > 0 && (
                        <InstrumentList
                            instruments={instrumentList}
                            onSelectionChange={setSelectedInstruments}
                            initialSelections={selectedInstruments}
                        />
                    )}

                    {/* Selected Count */}
                    {selectedInstruments.length > 0 && (
                        <div className="text-center">
                            <span className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-300 px-4 py-2 rounded-xl text-sm font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {selectedInstruments.length} instrument{selectedInstruments.length !== 1 ? 's' : ''} selected
                            </span>
                        </div>
                    )}

                    {/* Continue Button */}
                    <button
                        onClick={handleContinue}
                        disabled={selectedInstruments.length === 0}
                        className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:from-zinc-700 disabled:to-zinc-700 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 uppercase tracking-wider text-sm shadow-lg"
                    >
                        Continue
                    </button>

                </div>
            </div>
        </div>
    );
}

export default InstrumentSelection