function Bio({ userData, setUserData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <textarea
            className="border border-gray-500 p-2 pt-2 w-full rounded-2xl h-30 text-left"
            placeholder="Enter bio"
            value={userData.bio || ""}
            onChange={handleChange}
            name="bio"
        />
    );
}

export default Bio