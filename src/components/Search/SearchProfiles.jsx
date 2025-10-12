import { useEffect, useState } from "react";
import ProfileList from "./ProfileList";
import api, { USERS_ENDPOINT } from "../../services/api";
import ProfileSkeleton from "./ProfileSkeleton";
import UserStore from "../../stores/UserStore";

function SearchProfiles({ profileType }) {
  const currentUser = UserStore((state) => state.userData);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get(USERS_ENDPOINT);
        if (response.status === 200) {
          const data = response.data;
          setUsers(data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const findMatch = (currentUser, profile) => {
    const profileInstruments = profile?.selectedInstruments || [];
    const profileGenres = profile?.selectedGenres || [];
    const profileLocation = profile.location;

    const {
      selectedInstruments: userInstruments,
      selectedGenres: userGenres,
      location: userLocation,
    } = currentUser;

    const isInstrumentMatch = profileInstruments.some((instrument) =>
      userInstruments.includes(instrument)
    );

    if (profileType === "band" && !isInstrumentMatch) return false;

    const isGenreMatch =
      userGenres.includes("All") || profileGenres.some((genre) => userGenres.includes(genre));

    const isLocationMatch =
      userLocation === "All" || userLocation === profileLocation;

    return profileType === "solo"
      ? isInstrumentMatch && isGenreMatch && isLocationMatch
      : isGenreMatch && isLocationMatch;
  };

  if (!currentUser || !currentUser.email) {
    return (
      <div className="min-h-screen bg-zinc-950">
        <div className="fixed inset-0 bg-gradient-to-br from-violet-950/20 via-zinc-950 to-blue-950/20 pointer-events-none"></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-zinc-400">Please sign in to view matches.</div>
        </div>
      </div>
    );
  }

  const filteredProfiles = users
    .filter((user) => user.profileType === profileType)
    .filter((profile) => findMatch(currentUser, profile));

  const headerText = profileType === "solo" ? "Solo Musicians" : "Band Openings";
  const subHeaderText =
    profileType === "solo"
      ? "Matching local musicians looking for bands"
      : "Matching local bands looking for musicians";

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-950/20 via-zinc-950 to-blue-950/20 pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 sticky top-0 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 px-6 py-4 shadow-lg">
        <h1 className="text-3xl font-bold text-zinc-100 text-center tracking-tight">{headerText}</h1>
        <p className="text-sm text-zinc-400 text-center mt-2">{subHeaderText}</p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mb-13">
        {loading ? (
          <div className="p-5">
            <ProfileSkeleton />
            <ProfileSkeleton />
            <ProfileSkeleton />
          </div>
        ) : filteredProfiles.length === 0 ? (
          <div className="text-center mt-10">
            <svg className="w-16 h-16 mx-auto mb-4 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-zinc-500 text-sm">
              {profileType === "solo"
                ? "No musicians match your preferences yet."
                : "No band openings match your preferences yet."}
            </p>
          </div>
        ) : (
          <ProfileList header="" profiles={filteredProfiles} />
        )}
      </div>
    </div>
  );
}

export default SearchProfiles;