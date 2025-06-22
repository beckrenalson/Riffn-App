function SelectLocation({ signUpData, handleChange }) {
    return (
        <select
            name="location"
            value={signUpData.location}
            onChange={handleChange}
            className="w-full p-3 mt-4 rounded bg-black text-white border border-gray-600"
        >
            <option value="">Select a location</option>
            <option value="Auckland">Auckland</option>
            <option value="Wellington">Wellington</option>
            <option value="Christchurch">Christchurch</option>
            <option value="Hamilton">Hamilton</option>
            <option value="Tauranga">Tauranga</option>
            <option value="Napier-Hastings">Napier-Hastings</option>
            <option value="Dunedin">Dunedin</option>
            <option value="Palmerston North">Palmerston North</option>
            <option value="Nelson">Nelson</option>
            <option value="Rotorua">Rotorua</option>
            <option value="New Plymouth">New Plymouth</option>
            <option value="Whangārei">Whangārei</option>
            <option value="Invercargill">Invercargill</option>
            <option value="Gisborne">Gisborne</option>
            <option value="Timaru">Timaru</option>
            <option value="Blenheim">Blenheim</option>
        </select>
    );
}

export default SelectLocation;
