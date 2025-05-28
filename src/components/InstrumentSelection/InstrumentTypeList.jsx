import BackBtn from "../BackBtn"
import InstrumentType from "./InstrumentType"


function InstrumentTypeList() {
    return (
        <>
            <BackBtn />
            <div className="flex flex-col items-center gap-10 mt-10">
                <InstrumentType
                    type="Strings"

                />
                <InstrumentType
                    type="Percussion"

                />
                <InstrumentType
                    type="Wind"
                />
                <InstrumentType
                    type="Keys"
                />
                <InstrumentType
                    type="Electronic"
                />
                <InstrumentType
                    type="Vocals"
                />
            </div>
        </>
    )
}

export default InstrumentTypeList