function SelectLocation({ userData, handleChange }) {
    return (
        <div className="relative">
            <select
                name="location"
                value={userData.location}
                onChange={handleChange}
                className="w-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 rounded-xl px-4 py-3 focus:border-violet-500 focus:bg-zinc-800/80 transition-all outline-none cursor-pointer appearance-none pr-10"
            >
                <option value="" className="bg-zinc-900 text-zinc-400">Select a location</option>
                <option value="Online" className="bg-zinc-900 text-zinc-100">Online</option>
                <option value="All" className="bg-zinc-900 text-zinc-100">All</option>
                <option value="Auckland" className="bg-zinc-900 text-zinc-100">Auckland</option>
                <option value="Wellington" className="bg-zinc-900 text-zinc-100">Wellington</option>
                <option value="Christchurch" className="bg-zinc-900 text-zinc-100">Christchurch</option>
                <option value="Hamilton" className="bg-zinc-900 text-zinc-100">Hamilton</option>
                <option value="Tauranga" className="bg-zinc-900 text-zinc-100">Tauranga</option>
                <option value="Napier-Hastings" className="bg-zinc-900 text-zinc-100">Napier-Hastings</option>
                <option value="Dunedin" className="bg-zinc-900 text-zinc-100">Dunedin</option>
                <option value="Palmerston North" className="bg-zinc-900 text-zinc-100">Palmerston North</option>
                <option value="Nelson" className="bg-zinc-900 text-zinc-100">Nelson</option>
                <option value="Rotorua" className="bg-zinc-900 text-zinc-100">Rotorua</option>
                <option value="New Plymouth" className="bg-zinc-900 text-zinc-100">New Plymouth</option>
                <option value="Whangārei" className="bg-zinc-900 text-zinc-100">Whangārei</option>
                <option value="Invercargill" className="bg-zinc-900 text-zinc-100">Invercargill</option>
                <option value="Gisborne" className="bg-zinc-900 text-zinc-100">Gisborne</option>
                <option value="Timaru" className="bg-zinc-900 text-zinc-100">Timaru</option>
                <option value="Blenheim" className="bg-zinc-900 text-zinc-100">Blenheim</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}

export default SelectLocation;