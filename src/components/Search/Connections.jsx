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
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Connections</h1>
                <div className="flex items-center justify-center py-8">
                    <div className="text-gray-500">Loading requests...</div>
                </div>
            </div>
        );
    }

    if (!currentUser) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Connections</h1>
                <div className="text-gray-500">Please log in to view connection requests.</div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Connections</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                </div>
            )}

            {incomingRequests.length === 0 && (
                <div className="text-center py-8">
                    <div className="text-gray-500 text-lg">No pending connection requests</div>
                    <div className="text-gray-400 text-sm mt-2">
                        New requests will appear here when other users want to connect with you.
                    </div>
                </div>
            )}

            {incomingRequests.length > 0 && (
                <div className="space-y-3">
                    <div className="text-sm text-gray-600 mb-3">
                        {incomingRequests.length} pending request{incomingRequests.length !== 1 ? 's' : ''}
                    </div>
                    {incomingRequests.map(req => {
                        const isProcessing = processingRequests.has(req._id);
                        const displayName = req.fromUser?.userName ||
                            `${req.fromUser?.firstName || ''} ${req.fromUser?.lastName || ''}`.trim() ||
                            'Unknown User';

                        return (
                            <div
                                key={req._id}
                                className="flex justify-between items-center bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
                            >
                                <div className="flex-1">
                                    <p className="font-semibold text-white">{displayName}</p>
                                    <p className="text-sm text-gray-400">
                                        {req.fromUser?.profileType === 'band' ? 'Band' : 'Solo Artist'}
                                    </p>
                                    {req.message && (
                                        <p className="text-sm text-gray-300 mt-1 italic">
                                            "{req.message}"
                                        </p>
                                    )}
                                </div>
                                <div className="flex space-x-2 ml-4">
                                    <button
                                        onClick={() => handleAccept(req._id)}
                                        disabled={isProcessing}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
                                        aria-label={`Accept connection request from ${displayName}`}
                                    >
                                        {isProcessing ? '...' : 'Accept'}
                                    </button>
                                    <button
                                        onClick={() => handleReject(req._id)}
                                        disabled={isProcessing}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                                        aria-label={`Reject connection request from ${displayName}`}
                                    >
                                        {isProcessing ? '...' : 'Reject'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Connections;
