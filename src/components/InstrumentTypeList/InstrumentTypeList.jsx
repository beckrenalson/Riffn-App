import BackBtn from "../BackBtn"
import InstrumentType from "./InstrumentType"

function InstrumentTypeList({instrumentType}) {
    // console.log(instrumentType)
    return (
        <>
        <BackBtn />
            <div className="flex flex-col items-center gap-10 mt-10">
                <InstrumentType 
                instrumentType="Strings"
               
                />
                <InstrumentType 
                instrumentType="Percussion"
                
                />
                <InstrumentType 
                instrumentType="Wind"
                />
                <InstrumentType 
                instrumentType="Keys"
                />
                <InstrumentType 
                instrumentType="Electronic"
                />
                <InstrumentType 
                instrumentType="Vocal"
                />
            </div>
        </>
    )
}

export default InstrumentTypeList