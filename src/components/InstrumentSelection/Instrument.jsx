function Instrument({ instrumentIcon, instrumentName }) {
    return (
        <>
            <button className="flex flex-col items-center">
                <div className="rounded-full border-3 p-5">
                    <img
                        className="w-16"
                        src={instrumentIcon} />
                </div>
                <p className="font-bold">{instrumentName}</p>
            </button>
        </>
    )
}

export default Instrument