import { useEffect, useState } from 'react';
import NavBar from "../NavBar";
import { API_URL } from '../../config/api';
import UserStore from "../../stores/UserStore";

function Connections() {
    const currentUser = UserStore((state) => state.userData);
    const [incomingRequests, setIncomingRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        async function fetchRequests() {
            try {
                const res = await fetch(`${API_URL}/api/connections/requests/${currentUser._id}`);
                if (!res.ok) throw new Error("Failed to fetch requests");
                const data = await res.json();
                setIncomingRequests(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchRequests();
    }, [currentUser]);

    const handleAccept = async (requestId) => {
        try {
            const res = await fetch(`${API_URL}/api/connections/${requestId}/accept`, { method: 'POST' });
            if (!res.ok) throw new Error("Failed to accept request");
            setIncomingRequests(prev => prev.filter(r => r._id !== requestId));
        } catch (err) {
            console.error(err);
        }
    };

    const handleReject = async (requestId) => {
        try {
            const res = await fetch(`${API_URL}/api/connections/${requestId}/reject`, { method: 'POST' });
            if (!res.ok) throw new Error("Failed to reject request");
            setIncomingRequests(prev => prev.filter(r => r._id !== requestId));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="p-6 space-y-4">
                <h1 className="text-2xl font-bold">Connections</h1>
                {isLoading && <p>Loading requests...</p>}
                {!isLoading && incomingRequests.length === 0 && <p>No pending requests.</p>}
                {!isLoading && incomingRequests.length > 0 && (
                    <div className="space-y-3">
                        {incomingRequests.map(req => (
                            <div key={req._id} className="flex justify-between items-center bg-gray-800 p-4 rounded-md">
                                <div>
                                    <p className="font-semibold">{req.fromUser.userName}</p>
                                    <p className="text-sm text-gray-400">{req.fromUser.profileType === 'band' ? 'Band' : 'Solo Artist'}</p>
                                </div>
                                <div className="space-x-2">
                                    <button
                                        onClick={() => handleAccept(req._id)}
                                        className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(req._id)}
                                        className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <NavBar />
        </>
    );
}

export default Connections;
