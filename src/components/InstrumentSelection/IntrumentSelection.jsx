import InstrumentList from "./InstrumentList"
import BackBtn from "../BackBtn"
import { useParams } from "react-router";

function InstrumentSelection({ instrumentType }) {

    let { type } = useParams();
    let instruments = [];

    const stringInstruments = [
        { instrumentIcon: "/src/assets/instruments/guitar.png", instrumentName: "Guitar" },
        { instrumentIcon: "/src/assets/instruments/bass-guitar.png", instrumentName: "Bass Guitar" },
        { instrumentIcon: "/src/assets/instruments/violin.png", instrumentName: "Violin" },
        { instrumentIcon: "/src/assets/instruments/cello.png", instrumentName: "Cello" },
        { instrumentIcon: "/src/assets/instruments/harp.png", instrumentName: "Harp" },
        { instrumentIcon: "/src/assets/instruments/doublebass.png", instrumentName: "Double Bass" },
        { instrumentIcon: "/src/assets/instruments/banjo.png", instrumentName: "Banjo" },
        { instrumentIcon: "/src/assets/instruments/ukelele.png", instrumentName: "Ukulele" }
    ];

    const percussionInstruments = [
        { instrumentIcon: "/src/assets/instruments/drums.png", instrumentName: "Drums" },
        { instrumentIcon: "/src/assets/instruments/cajon.png", instrumentName: "Cajón" },
        { instrumentIcon: "/src/assets/instruments/bongos.png", instrumentName: "Bongo" },
        { instrumentIcon: "/src/assets/instruments/djembe.png", instrumentName: "Djembe" },
        { instrumentIcon: "/src/assets/instruments/tabla.png", instrumentName: "Tabla" },
        { instrumentIcon: "/src/assets/instruments/tambourine.png", instrumentName: "Tambourine" },
        { instrumentIcon: "/src/assets/instruments/maracas.png", instrumentName: "Maracas" },
        { instrumentIcon: "/src/assets/instruments/xylophone.png", instrumentName: "Xylophone" },
        { instrumentIcon: "/src/assets/instruments/timpani.png", instrumentName: "Timpani" }
    ];

    const windInstruments = [
        { instrumentIcon: "/src/assets/instruments/saxophone.png", instrumentName: "Saxophone" },
        { instrumentIcon: "/src/assets/instruments/trumpet.png", instrumentName: "Trumpet" },
        { instrumentIcon: "/src/assets/instruments/flute.png", instrumentName: "Flute" },
        { instrumentIcon: "/src/assets/instruments/clarinet.png", instrumentName: "Clarinet" },
        { instrumentIcon: "/src/assets/instruments/trombone.png", instrumentName: "Trombone" },
        { instrumentIcon: "/src/assets/instruments/fluglehorn.png", instrumentName: "Flugelhorn" },
        { instrumentIcon: "/src/assets/instruments/voltorna.png", instrumentName: "Voltorna" },
        { instrumentIcon: "/src/assets/instruments/harmonica.png", instrumentName: "Harmonica" }
    ];

    const keyInstruments = [
        { instrumentIcon: "/src/assets/instruments/piano.png", instrumentName: "Piano" },
        { instrumentIcon: "/src/assets/instruments/keyboard.png", instrumentName: "Electric Keyboard" },
        { instrumentIcon: "/src/assets/instruments/organ.png", instrumentName: "Organ" },
        { instrumentIcon: "/src/assets/instruments/accordion.png", instrumentName: "Accordion" }

    ];

    const electronicInstruments = [
        { instrumentIcon: "/src/assets/instruments/synthetiser.png", instrumentName: "Synthesisers" },
        { instrumentIcon: "/src/assets/instruments/drummachine.png", instrumentName: "Drum Machines" },
        { instrumentIcon: "/src/assets/instruments/midi.png", instrumentName: "MIDI Controllers" },
        { instrumentIcon: "/src/assets/instruments/sampler.png", instrumentName: "Samplers" }
    ];

    const vocalInstruments = [
        { instrumentIcon: "/src/assets/instruments/leadvocal.png", instrumentName: "Lead Vocals" },
        { instrumentIcon: "/src/assets/instruments/backing-vocals.png", instrumentName: "Backing Vocals" },
        { instrumentIcon: "/src/assets/instruments/beatboxing.png", instrumentName: "Beatboxing" },
        { instrumentIcon: "/src/assets/instruments/choir.png", instrumentName: "Choral Arrangement" }
    ];

    if (type == "Strings") {
        instruments = stringInstruments;
    } else if (type == "Percussion") {
        instruments = percussionInstruments;
    } else if (type == "Wind") {
        instruments = windInstruments;
    } else if (type == "Keys") {
        instruments = keyInstruments;
    } else if (type == "Electronic") {
        instruments = electronicInstruments;
    } else if (type == "Vocal") {
        instruments = vocalInstruments;
    }

    return (
        <>
            <BackBtn />
            <div className="flex justify-center mt-10">
                <InstrumentList
                    instruments={instruments}
                />
            </div>
        </>
    )
}

export default InstrumentSelection