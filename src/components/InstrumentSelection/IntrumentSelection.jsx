import InstrumentList from "./InstrumentList"
import BackBtn from "../BackBtn"
import { useParams } from "react-router";
import Continue from "../InstrumentSelection/Continue";
import { useState, useEffect } from "react";

function InstrumentSelection() {

    let { type } = useParams()

    const [instrumentList, setInstrumentList] = useState([])

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
                {instrumentList.length > 0 && <InstrumentList
                    instruments={instrumentList}
                />}
                <Continue />
            </div>
        </>
    )
}

export default InstrumentSelection