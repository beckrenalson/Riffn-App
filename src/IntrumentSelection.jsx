import Instrument from "./components/Instrument"
import BackBtn from "./components/BackBtn"

function InstrumentSelection() {
    return (
        <>
        <BackBtn />
            <div className="flex justify-center gap-2 mt-10">
                <Instrument
                    instrumentIcon="./src/assets/instruments/guitar.png"
                    instrumentName="Guitar"
                />
                <Instrument
                    instrumentIcon="./src/assets/instruments/bass-guitar.png"
                    instrumentName="Bass Guitar"
                />
                <Instrument
                    instrumentIcon="./src/assets/instruments/violin.png"
                    instrumentName="Violin"
                />
            </div>
        </>
    )
}

export default InstrumentSelection