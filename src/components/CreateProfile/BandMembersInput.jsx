import { useState } from "react";

function BandMembersInput({ members, setMembers }) {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!inputValue.trim()) return;
        const updated = [...members, inputValue.trim()];
        setMembers(updated);
        setInputValue("");
    };

    const handleDelete = (memberToRemove) => {
        const updated = members.filter((m) => m !== memberToRemove);
        setMembers(updated);
    };

    return (
        <div className="mt-4">
            <form onSubmit={handleSubmit}>
                <input
                    className="border border-gray-500 p-2 w-full rounded"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter band member"
                />
                <button
                    type="submit"
                    className="border border-gray-500 mt-2 px-4 py-1 rounded"
                >
                    Add band member
                </button>
            </form>
            <ul className="mt-4 space-y-1">
                {members.map((member) => (
                    <li
                        key={member}
                        className="flex justify-between items-center border border-gray-500 p-2 rounded"
                    >
                        {member}
                        <button
                            className="bg-red-500 p-1 rounded-lg"
                            onClick={() => handleDelete(member)}
                        >
                            <img
                                className="h-6"
                                src="/images/trash.png"
                                alt="Delete"
                                style={{ filter: 'invert(1)' }}
                            />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BandMembersInput;
