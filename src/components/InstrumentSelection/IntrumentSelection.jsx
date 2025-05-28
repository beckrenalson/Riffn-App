import InstrumentList from "./InstrumentList"
import BackBtn from "../BackBtn"
import { useParams } from "react-router";
import Continue from "../InstrumentSelection/Continue";
import { useState, useEffect } from "react";

function InstrumentSelection() {

    let { type } = useParams();
    let instruments = [];

    const [instrumentList, setInstrumentList] = useState([])

    let { type } = useParams();

    useEffect(() => {
        if (instrumentList.length === 0) {
            const getInstruments = async () => {
                const response = await fetch(`http://localhost:3000/instruments/${type}`);
                const data = await response.json();
                setInstrumentList(data)
            }
            getInstruments();
        }
    }, [type])

    return (
        <>
            <BackBtn />
            <div className="flex justify-center mt-10">
                {genresList.length > 0 && <InstrumentList
                    instruments={instrumentList}
                />}
                <Continue />
            </div>
        </>
    )
}

export default InstrumentSelection