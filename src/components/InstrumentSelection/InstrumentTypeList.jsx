import BackBtn from "../BackBtn";
import InstrumentType from "./InstrumentType";

function InstrumentTypeList() {
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
            </div>
        </>
    );
}

export default InstrumentTypeList;
