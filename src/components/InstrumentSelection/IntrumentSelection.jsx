import InstrumentList from "./InstrumentList"
import BackBtn from "../BackBtn"
import { useParams } from "react-router";
import Continue from "../InstrumentSelection/Continue";

function InstrumentSelection() {

    let { type } = useParams();
    let instruments = [];

    const stringInstruments = [
        { instrumentIcon: "/images/instruments/guitar.png", instrumentName: "Guitar" },
        { instrumentIcon: "/images/instruments/bass-guitar.png", instrumentName: "Bass Guitar" },
        { instrumentIcon: "/images/instruments/violin.png", instrumentName: "Violin" },
        { instrumentIcon: "/images/instruments/cello.png", instrumentName: "Cello" },
        { instrumentIcon: "/images/instruments/harp.png", instrumentName: "Harp" },
        { instrumentIcon: "/images/instruments/doublebass.png", instrumentName: "Double Bass" },
        { instrumentIcon: "/images/instruments/banjo.png", instrumentName: "Banjo" },
        { instrumentIcon: "/images/instruments/ukelele.png", instrumentName: "Ukulele" }
    ];

    const percussionInstruments = [
        { instrumentIcon: "/images/instruments/drums.png", instrumentName: "Drums" },
        { instrumentIcon: "/images/instruments/cajon.png", instrumentName: "Cajón" },
        { instrumentIcon: "/images/instruments/bongos.png", instrumentName: "Bongo" },
        { instrumentIcon: "/images/instruments/djembe.png", instrumentName: "Djembe" },
        { instrumentIcon: "/images/instruments/tabla.png", instrumentName: "Tabla" },
        { instrumentIcon: "/images/instruments/tambourine.png", instrumentName: "Tambourine" },
        { instrumentIcon: "/images/instruments/maracas.png", instrumentName: "Maracas" },
        { instrumentIcon: "/images/instruments/xylophone.png", instrumentName: "Xylophone" },
        { instrumentIcon: "/images/instruments/timpani.png", instrumentName: "Timpani" }
    ];

    const windInstruments = [
        { instrumentIcon: "/images/instruments/saxophone.png", instrumentName: "Saxophone" },
        { instrumentIcon: "/images/instruments/trumpet.png", instrumentName: "Trumpet" },
        { instrumentIcon: "/images/instruments/flute.png", instrumentName: "Flute" },
        { instrumentIcon: "/images/instruments/clarinet.png", instrumentName: "Clarinet" },
        { instrumentIcon: "/images/instruments/trombone.png", instrumentName: "Trombone" },
        { instrumentIcon: "/images/instruments/fluglehorn.png", instrumentName: "Flugelhorn" },
        { instrumentIcon: "/images/instruments/voltorna.png", instrumentName: "Voltorna" },
        { instrumentIcon: "/images/instruments/harmonica.png", instrumentName: "Harmonica" }
    ];

    const keyInstruments = [
        { instrumentIcon: "/images/instruments/piano.png", instrumentName: "Piano" },
        { instrumentIcon: "/images/instruments/keyboard.png", instrumentName: "Electric Keyboard" },
        { instrumentIcon: "/images/instruments/organ.png", instrumentName: "Organ" },
        { instrumentIcon: "/images/instruments/accordion.png", instrumentName: "Accordion" }

    ];

    const electronicInstruments = [
        { instrumentIcon: "/images/instruments/synthetiser.png", instrumentName: "Synthesisers" },
        { instrumentIcon: "/images/instruments/drummachine.png", instrumentName: "Drum Machines" },
        { instrumentIcon: "/images/instruments/midi.png", instrumentName: "MIDI Controllers" },
        { instrumentIcon: "/images/instruments/sampler.png", instrumentName: "Samplers" }
    ];

    const vocalInstruments = [
        { instrumentIcon: "/images/instruments/leadvocal.png", instrumentName: "Lead Vocals" },
        { instrumentIcon: "/images/instruments/backing-vocals.png", instrumentName: "Backing Vocals" },
        { instrumentIcon: "/images/instruments/beatboxing.png", instrumentName: "Beatboxing" },
        { instrumentIcon: "/images/instruments/choir.png", instrumentName: "Choral Arrangement" }
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
                <Continue />
            </div>
        </>
    )
}

export default InstrumentSelection