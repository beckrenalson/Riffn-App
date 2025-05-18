import Instrument from "./components/InstrumentSelection/Instrument"
import BackBtn from "./components/BackBtn"

function InstrumentSelection() {

    // const strings = ["Guitar", "Bass Guitar"]

    return (
        <>
        <BackBtn />
            <div className="flex justify-center gap-2 mt-10">
                <div>
                <Instrument
                    instrumentIcon="./src/assets/instruments/guitar.png"
                    instrumentName="Guitar"
                />
                <Instrument
                    instrumentIcon="./src/assets/instruments/bass-guitar.png"
                    instrumentName="Bass Guitar"
                />
                 <Instrument
                    instrumentIcon="./src/assets/instruments/banjo.png"
                    instrumentName="Banjo"
                />
                </div>
                <div>
                 <Instrument
                    instrumentIcon="./src/assets/instruments/ukelele.png"
                    instrumentName="Ukelele"
                />
                <Instrument
                    instrumentIcon="./src/assets/instruments/violin.png"
                    instrumentName="Violin"
                />
                 <Instrument
                    instrumentIcon="./src/assets/instruments/cello.png"
                    instrumentName="Cello"
                />
                </div>
                <div>
                 <Instrument
                    instrumentIcon="./src/assets/instruments/doublebass.png"
                    instrumentName="Double Bass"
                />
                 <Instrument
                    instrumentIcon="./src/assets/instruments/harp.png"
                    instrumentName="Harp"
                />
                </div>
            </div>
        </>
    )
}

export default InstrumentSelection