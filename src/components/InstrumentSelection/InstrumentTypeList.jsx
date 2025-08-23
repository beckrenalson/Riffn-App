import BackBtn from "../BackBtn";
import InstrumentType from "./InstrumentType";
import InstrumentStore from "../../stores/InstrumentStore";
import UserStore from "../../stores/UserStore";
import { useEffect } from "react";
import axios from "axios";
import { INSTRUMENTS_ENDPOINT } from "../../config/api";

function InstrumentTypeList() {
    const clearSelectedInstruments = InstrumentStore((state) => state.clearSelectedInstruments);
    const setInstrumentList = InstrumentStore((state) => state.setInstrumentList);

    const userData = UserStore((state) => state.userData)

    useEffect(() => {
        async function fetchInstruments() {
            try {
                const res = await axios.get(INSTRUMENTS_ENDPOINT);
                setInstrumentList(res.data); // assumes array of { name, type }
            } catch (err) {
                console.error("Failed to fetch instruments:", err);
            }
        }

        fetchInstruments();
    }, []);

    return (
        <>
            <BackBtn />
            <div className="flex flex-col items-center px-4 pt-8 mb-10">
                <div className="max-w-md text-center mb-10">
                    {userData.profileType === "solo" && (
                        <h1 className="text-2xl font-bold text-white mb-2">
                            What kind of instruments do you play?
                        </h1>
                    )}

                    {userData.profileType === "band" && (
                        <h1 className="text-2xl font-bold text-white mb-2">
                            What kind of instruments does your band need?
                        </h1>
                    )}

                    <p className="text-sm text-gray-400">
                        Choose an instrument type to explore options and make your selection.
                    </p>
                </div>

                <div className="flex flex-col gap-6 w-full max-w-xs">
                    <InstrumentType type="Strings" />
                    <InstrumentType type="Percussion" />
                    <InstrumentType type="Wind" />
                    <InstrumentType type="Keys" />
                    <InstrumentType type="Electronic" />
                    <InstrumentType type="Vocals" />
                </div>

                <button
                    onClick={clearSelectedInstruments}
                    className="mt-8 px-4 py-3 w-full text-base font-medium text-red-600 bg-red-100 rounded-xl shadow-sm hover:bg-red-200 active:bg-red-300 transition-all"
                >
                    Clear All Selections
                </button>
            </div>
        </>
    );
}

export default InstrumentTypeList;
