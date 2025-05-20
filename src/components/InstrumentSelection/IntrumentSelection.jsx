import InstrumentList from "./InstrumentList"
import BackBtn from "../BackBtn"
import { useParams } from "react-router";

function InstrumentSelection({instrumentType}) {

    let { type } = useParams();
    
    // console.log(type)

    let instruments = [];

    // console.log(window.location.href)

    const stringInstruments = [
        {
            instrumentIcon: "/src/assets/instruments/guitar.png",
            instrumentName: "Guitar"
        },
        {
            instrumentIcon: "/src/assets/instruments/bass-guitar.png",
            instrumentName: "Bass Guitar"
        },
        {
            instrumentIcon: "/src/assets/instruments/banjo.png",
            instrumentName: "Banjo"
        },
        {
            instrumentIcon: "/src/assets/instruments/ukelele.png",
            instrumentName: "Ukelele"
        },
        {
            instrumentIcon: "/src/assets/instruments/violin.png",
            instrumentName: "Violin"
        },
        {
            instrumentIcon: "/src/assets/instruments/cello.png",
            instrumentName: "Cello"
        },
        {
            instrumentIcon: "/src/assets/instruments/doublebass.png",
            instrumentName: "Double Bass"
        },
        {
            instrumentIcon: "/src/assets/instruments/harp.png",
            instrumentName: "Harp"
        }
    ]

    const percussionInstruments = [
        {
            instrumentIcon: "/src/assets/instruments/drums.png",
            instrumentName: "Drums"
        }
    ]


    if (type == "Percussion") {
        instruments = percussionInstruments;
    } else if (type == "Strings") {
        instruments = stringInstruments;
    }

    // console.log(instruments)

    return (
        <>
            <BackBtn />
            <div className="flex flex-wrap gap-2 mt-10">
                <InstrumentList
                    instruments={instruments}
                />
            </div>
        </>
    )
}

export default InstrumentSelection