import { useState, useEffect } from "react";
import api, { USERS_ENDPOINT } from "../../services/api";

function BandMembersInput({ members, setMembers, currentUserId }) {
    const [inputValue, setInputValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

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
                const data = res.data;

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
        } catch (err) {
            console.error("Error adding member:", err);
            setMembers(originalMembers);
        }
    };

    const handleDelete = async (memberId) => {
        const originalMembers = [...members];
        setMembers(members.filter((m) => m._id !== memberId));

        if (!currentUserId) return;

        try {
            await api.delete(`${USERS_ENDPOINT}/${currentUserId}/bandMembers/${memberId}`);
        } catch (err) {
            console.error("Error removing member:", err);
            setMembers(originalMembers);
        }
    };

    const displayName = (member) => {
        if (member.userName) return member.userName;
        const fullName = `${member.firstName || ""} ${member.lastName || ""}`.trim();
        return fullName || "Unknown Member";
    };

    return (
        <div className="relative">
            <input
                className="w-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 rounded-xl px-4 py-3 focus:border-violet-500 focus:bg-zinc-800/80 transition-all outline-none placeholder-zinc-500"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search and add band member"
                aria-label="Search for band members"
            />

            {inputValue && (
                <div className="absolute w-full mt-2 z-50">
                    {loading ? (
                        <div className="bg-zinc-900 border border-zinc-700/50 rounded-xl p-3 text-zinc-400 shadow-xl">
                            Loading...
                        </div>
                    ) : searchResults.length > 0 ? (
                        <ul className="bg-zinc-900 border border-zinc-700/50 rounded-xl max-h-48 overflow-y-auto shadow-xl">
                            {searchResults.map((user) => (
                                <li
                                    key={user._id}
                                    className="p-3 hover:bg-zinc-800 cursor-pointer transition-colors text-zinc-200 border-b border-zinc-800/50 last:border-b-0"
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
                                    <span className="font-medium">{user.userName}</span>
                                    {user.firstName && user.lastName && (
                                        <span className="text-zinc-400 text-sm ml-2">
                                            ({user.firstName} {user.lastName})
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="bg-zinc-900 border border-zinc-700/50 rounded-xl p-3 text-zinc-400 shadow-xl">
                            No users found
                        </div>
                    )}
                </div>
            )}

            {members.length > 0 && (
                <ul className="mt-4 space-y-2">
                    {members.map((member) => (
                        <li
                            key={member._id}
                            className="flex justify-between items-center bg-zinc-800/50 border border-zinc-700/50 p-3 rounded-xl hover:border-violet-500/30 transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-xs font-semibold text-white">
                                        {displayName(member).charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-zinc-200 font-medium">{displayName(member)}</span>
                            </div>
                            <button
                                type="button"
                                className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
                                onClick={() => handleDelete(member._id)}
                                aria-label={`Remove ${displayName(member)}`}
                            >
                                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BandMembersInput;