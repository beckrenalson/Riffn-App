import { useState, useEffect } from "react";
import api, { USERS_ENDPOINT } from "../../services/api";

function BandMembersInput({ members, setMembers, currentUserId }) {
    const [inputValue, setInputValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch search results as user types
    useEffect(() => {
        if (!inputValue.trim()) {
            setSearchResults([]);
            return;
        }

        const controller = new AbortController();

        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await api.get(
                    `${USERS_ENDPOINT}?search=${encodeURIComponent(inputValue)}&profileType=solo`,
                    { signal: controller.signal }
                );
                const data = res.data; // Axios returns data here

                // Exclude members already added and current user
                const filtered = data.filter(
                    (u) => !members.some((m) => m._id === u._id) && u._id !== currentUserId
                );
                setSearchResults(filtered);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Error fetching users:", err);
                    setSearchResults([]);
                }
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchUsers, 300);
        return () => {
            clearTimeout(debounceTimer);
            controller.abort();
        };
    }, [inputValue, members, currentUserId]);

    // Add member optimistically
    const handleAddMember = async (user) => {
        const originalMembers = [...members];
        setMembers([...members, user]);
        setInputValue("");
        setSearchResults([]);

        if (!currentUserId) return;

        try {
            await api.post(`${USERS_ENDPOINT}/${currentUserId}/bandMembers`, {
                memberId: user._id,
            });
            // Success: nothing else to do, optimistic UI already updated
        } catch (err) {
            console.error("Error adding member:", err);
            setMembers(originalMembers); // rollback
        }
    };

    // Remove member optimistically
    const handleDelete = async (memberId) => {
        const originalMembers = [...members];
        setMembers(members.filter((m) => m._id !== memberId));

        if (!currentUserId) return;

        try {
            await api.delete(`${USERS_ENDPOINT}/${currentUserId}/bandMembers/${memberId}`);
            // Success: nothing else to do
        } catch (err) {
            console.error("Error removing member:", err);
            setMembers(originalMembers); // rollback
        }
    };

    const displayName = (member) => {
        if (member.userName) return member.userName;
        const fullName = `${member.firstName || ""} ${member.lastName || ""}`.trim();
        return fullName || "Unknown Member";
    };

    return (
        <div className="mt-4 relative">
            <input
                className="border border-gray-500 p-2 w-full rounded-xl"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search and add band member"
                aria-label="Search for band members"
            />

            {/* Search results dropdown */}
            {inputValue && (
                <div className="absolute w-full mt-1 z-50">
                    {loading ? (
                        <div className="bg-white border border-gray-300 rounded-xl p-2 text-gray-500">
                            Loading...
                        </div>
                    ) : searchResults.length > 0 ? (
                        <ul className="border border-gray-300 rounded-xl max-h-48 overflow-y-auto bg-white text-black shadow-lg">
                            {searchResults.map((user) => (
                                <li
                                    key={user._id}
                                    className="p-2 hover:bg-gray-200 cursor-pointer transition-colors"
                                    onClick={() => handleAddMember(user)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            handleAddMember(user);
                                        }
                                    }}
                                >
                                    {user.userName}{" "}
                                    {user.firstName && user.lastName
                                        ? `(${user.firstName} ${user.lastName})`
                                        : ""}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="bg-white border border-gray-300 rounded-xl p-2 text-gray-500">
                            No users found
                        </div>
                    )}
                </div>
            )}

            {/* Current members */}
            {members.length > 0 && (
                <ul className="mt-4 mb-6 space-y-1">
                    {members.map((member) => (
                        <li
                            key={member._id}
                            className="flex justify-between items-center border border-gray-500 p-2 rounded-2xl"
                        >
                            <span>{displayName(member)}</span>
                            <button
                                type="button"
                                className="bg-red-500 p-1 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                                onClick={() => handleDelete(member._id)}
                                aria-label={`Remove ${displayName(member)}`}
                            >
                                <img
                                    className="h-6"
                                    src="/images/trash.png"
                                    alt="Delete"
                                    style={{ filter: "invert(1)" }}
                                />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BandMembersInput;
