import { useEffect, useState } from 'react';
import UserStore from "../../stores/UserStore";
import api, { USERS_ENDPOINT } from '../../services/api';

function Connections() {
    const currentUser = UserStore((state) => state.userData);
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [processingRequests, setProcessingRequests] = useState(new Set());
    const [error, setError] = useState("");

    useEffect(() => {
        if (!currentUser?._id) {
            setIsLoading(false);
            return;
        }

        async function fetchRequests() {
            try {
                setError("");
                const res = await api.get(`/connections/requests/${currentUser._id}`);
                if (res.status !== 200) {
                    throw new Error("Failed to fetch requests");
                }
                setIncomingRequests(res.data);
            } catch (err) {
                console.error("Error fetching requests:", err);
                setError("Failed to load connection requests. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchRequests();
    }, [currentUser?._id]);

    const handleAccept = async (requestId) => {
        if (processingRequests.has(requestId)) return;

        setProcessingRequests(prev => new Set(prev).add(requestId));
        setError("");

        try {
            const res = await api.post(`/connections/${requestId}/accept`);
            if (res.status !== 200) {
                throw new Error("Failed to accept request");
            }

            setIncomingRequests(prev => prev.filter(r => r._id !== requestId));

            // Refresh user data
            try {
                const userResponse = await api.get(`${USERS_ENDPOINT}/${currentUser._id}`);
                if (userResponse.status === 200) {
                    UserStore.getState().setUserData(userResponse.data);
                }
            } catch (userFetchError) {
                console.warn("Failed to refresh user data:", userFetchError);
            }
        } catch (err) {
            console.error("Error accepting request:", err);
            setError("Failed to accept connection request. Please try again.");
        } finally {
            setProcessingRequests(prev => {
                const newSet = new Set(prev);
                newSet.delete(requestId);
                return newSet;
            });
        }
    };

    const handleReject = async (requestId) => {
        if (processingRequests.has(requestId)) return;

        setProcessingRequests(prev => new Set(prev).add(requestId));
        setError("");

        try {
            const res = await api.post(`/connections/${requestId}/reject`);
            if (res.status !== 200) {
                throw new Error("Failed to reject request");
            }

            setIncomingRequests(prev => prev.filter(r => r._id !== requestId));
        } catch (err) {
            console.error("Error rejecting request:", err);
            setError("Failed to reject connection request. Please try again.");
        } finally {
            setProcessingRequests(prev => {
                const newSet = new Set(prev);
                newSet.delete(requestId);
                return newSet;
            });
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-950">
                <div className="fixed inset-0 bg-gradient-to-br from-violet-950/20 via-zinc-950 to-blue-950/20 pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="sticky top-0 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 px-6 py-4 shadow-lg">
                        <h1 className="text-3xl font-bold text-zinc-100 text-center tracking-tight">Connections</h1>
                    </div>
                    <div className="flex items-center justify-center min-h-[50vh]">
                        <div className="text-zinc-400">Loading requests...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="min-h-screen bg-zinc-950">
                <div className="fixed inset-0 bg-gradient-to-br from-violet-950/20 via-zinc-950 to-blue-950/20 pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="sticky top-0 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 px-6 py-4 shadow-lg">
                        <h1 className="text-3xl font-bold text-zinc-100 text-center tracking-tight">Connections</h1>
                    </div>
                    <div className="flex items-center justify-center min-h-[50vh]">
                        <div className="text-zinc-400">Please log in to view connection requests.</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Animated background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-violet-950/20 via-zinc-950 to-blue-950/20 pointer-events-none"></div>

            {/* Header */}
            <div className="relative z-10 sticky top-0 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 px-6 py-4 shadow-lg">
                <h1 className="text-3xl font-bold text-zinc-100 text-center tracking-tight">Connections</h1>
                {incomingRequests.length > 0 && (
                    <p className="text-sm text-zinc-400 text-center mt-2">
                        {incomingRequests.length} pending request{incomingRequests.length !== 1 ? 's' : ''}
                    </p>
                )}
            </div>

            {/* Main Content */}
            <div className="relative z-10 px-4 pt-6 pb-24">
                <div className="max-w-2xl mx-auto space-y-4">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl">
                            {error}
                        </div>
                    )}

                    {incomingRequests.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 mx-auto mb-4 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <div className="text-zinc-500 text-lg font-medium">No pending connection requests</div>
                            <div className="text-zinc-600 text-sm mt-2">
                                New requests will appear here when other users want to connect with you.
                            </div>
                        </div>
                    )}

                    {incomingRequests.length > 0 && (
                        <div className="space-y-3">
                            {incomingRequests.map(req => {
                                const isProcessing = processingRequests.has(req._id);
                                const displayName = req.fromUser?.userName ||
                                    `${req.fromUser?.firstName || ''} ${req.fromUser?.lastName || ''}`.trim() ||
                                    'Unknown User';

                                return (
                                    <div
                                        key={req._id}
                                        className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-5 transition-all duration-300 hover:border-zinc-700/50"
                                    >
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-zinc-100 text-lg truncate">{displayName}</p>
                                                <p className="text-sm text-zinc-400 mt-1">
                                                    {req.fromUser?.profileType === 'band' ? 'Band' : 'Solo Artist'}
                                                </p>
                                                {req.message && (
                                                    <p className="text-sm text-zinc-300 mt-3 italic leading-relaxed">
                                                        "{req.message}"
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-3 mt-4">
                                            <button
                                                onClick={() => handleAccept(req._id)}
                                                disabled={isProcessing}
                                                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-zinc-700 disabled:to-zinc-700 text-white px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed text-sm"
                                                aria-label={`Accept connection request from ${displayName}`}
                                            >
                                                {isProcessing ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    </div>
                                                ) : 'Accept'}
                                            </button>
                                            <button
                                                onClick={() => handleReject(req._id)}
                                                disabled={isProcessing}
                                                className="flex-1 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 disabled:opacity-50 text-zinc-300 px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed text-sm"
                                                aria-label={`Reject connection request from ${displayName}`}
                                            >
                                                {isProcessing ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin"></div>
                                                    </div>
                                                ) : 'Reject'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Connections;