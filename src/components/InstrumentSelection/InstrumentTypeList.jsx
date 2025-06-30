import BackBtn from "../BackBtn";
import InstrumentType from "./InstrumentType";
import InstrumentStore from "./InstrumentStore";


function InstrumentTypeList() {
    const clearSelectedInstruments = InstrumentStore((state) => state.clearSelectedInstruments);

    return (
        <>
            <BackBtn />
            <div className="flex flex-col items-center px-4 pt-8">
                <div className="max-w-md text-center mb-10">
                    <h1 className="text-2xl font-bold text-white mb-2">
                        What kind of instruments do you play?
                    </h1>
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
                    className="mt-10 text-sm text-red-400 underline hover:text-red-300"
                >
                    Clear All Selections
                </button>
            </div>
        </>
    );
}

export default InstrumentTypeList;
