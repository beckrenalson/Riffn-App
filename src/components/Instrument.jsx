function Instrument({ instrumentIcon, instrumentName }) {
    return (
        <>
            <button className="flex flex-col items-center">
                <div className="rounded-full border p-5">
                    <img
                        className="w-16"
                        src={instrumentIcon} />
                </div>
                <p>{instrumentName}</p>
            </button>
        </>
    )
}

export default Instrument