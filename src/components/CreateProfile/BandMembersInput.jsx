import { useState, useEffect } from "react";
import { USERS_ENDPOINT } from "../../config/api";

function BandMembersInput({ members, setMembers, currentUserId }) {
    const [inputValue, setInputValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // const API_BASE =
    //     process.env.NODE_ENV === "development"
    //         ? "http://localhost:5000/api/users"
    //         : "/api/users";

    const API_BASE = USERS_ENDPOINT;

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
                const res = await fetch(
                    `${API_BASE}?search=${encodeURIComponent(inputValue)}`,
                    { signal: controller.signal }
                );
                if (!res.ok) throw new Error("Failed to fetch users");
                const data = await res.json();
                // Exclude members already added
                const filtered = data.filter(
                    (u) => !members.some((m) => m._id === u._id)
                );
                setSearchResults(filtered);
            } catch (err) {
                if (err.name !== "AbortError") console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchUsers, 300); // Add debouncing
        return () => {
            clearTimeout(debounceTimer);
            controller.abort();
        };
    }, [inputValue, members, API_BASE]);

    // Add member both locally and in DB
    const handleAddMember = async (user) => {
        try {
            // Optimistic UI update
            const updatedMembers = [...members, user];
            setMembers(updatedMembers);

            // Only make API call if currentUserId is provided
            if (currentUserId) {
                const res = await fetch(`${API_BASE}/${currentUserId}/bandMembers`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ memberId: user._id }),
                });

                if (!res.ok) {
                    console.error("Failed to save member");
                    // Revert optimistic update on failure
                    setMembers(members);
                }
            }
        } catch (err) {
            console.error(err);
            // Revert optimistic update on error
            setMembers(members);
        } finally {
            setInputValue("");
            setSearchResults([]);
        }
    };

    // Remove member both locally and in DB
    const handleDelete = async (memberId) => {
        try {
            // Store original state for potential rollback
            const originalMembers = [...members];
            const updatedMembers = members.filter((m) => m._id !== memberId);
            setMembers(updatedMembers);

            // Only make API call if currentUserId is provided
            if (currentUserId) {
                const res = await fetch(
                    `${API_BASE}/${currentUserId}/bandMembers/${memberId}`,
                    { method: "DELETE" }
                );

                if (!res.ok) {
                    console.error("Failed to remove member");
                    // Revert on failure
                    setMembers(originalMembers);
                }
            }
        } catch (err) {
            console.error(err);
            // Revert on error - restore original members
            setMembers(members.filter((m) => m._id !== memberId));
        }
    };

    return (
        <div className="mt-4 relative">
            <input
                className="border border-gray-500 p-2 w-full rounded-xl"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search and add band member"
            />

            {/* Search results dropdown */}
            {inputValue && (
                <div className="absolute w-full mt-1 z-50">
                    {loading ? (
                        <div className="bg-white border border-gray-300 rounded-xl p-2 text-gray-500">
                            Loading...
                        </div>
                    ) : searchResults.length > 0 ? (
                        <ul className="border border-gray-300 rounded-xl max-h-48 overflow-y-auto bg-white">
                            {searchResults.map((user) => (
                                <li
                                    key={user._id}
                                    className="p-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleAddMember(user)}
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
            <ul className="mt-4 mb-6 space-y-1">
                {members.map((member) => (
                    <li
                        key={member._id}
                        className="flex justify-between items-center border border-gray-500 p-2 rounded-2xl"
                    >
                        <span>
                            {member.userName || `${member.firstName || ''} ${member.lastName || ''}`.trim() || 'Unknown Member'}
                        </span>
                        <button
                            type="button"
                            className="bg-red-500 p-1 rounded-lg hover:bg-red-600 transition-colors"
                            onClick={() => handleDelete(member._id)}
                            aria-label={`Remove ${member.userName || 'member'}`}
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
        </div>
    );
}

export default BandMembersInput;