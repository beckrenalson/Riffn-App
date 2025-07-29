function Bio({ signUpData, setSignUpData }) {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <textarea
            className="border border-gray-500 p-2 pt-2 w-full rounded h-40 mb-4 text-left"
            placeholder="Enter bio"
            value={signUpData.bio || ""}
            onChange={handleChange}
            name="bio"
        />
    )
}

export default Bio