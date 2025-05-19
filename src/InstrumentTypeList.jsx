import BackBtn from "./components/BackBtn"
import InstrumentType from "./components/InstrumentSelection/InstrumentType"

function InstrumentTypeList({instrumentType}) {
    // console.log(instrumentType)
    return (
        <>
        <BackBtn 
        goBack="/UserSelection"
        />
            <div className="flex flex-col items-center gap-10">
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