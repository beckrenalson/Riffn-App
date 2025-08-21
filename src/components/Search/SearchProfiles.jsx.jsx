import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import ProfileList from "./ProfileList";
import { USERS_ENDPOINT } from "../../config/api";
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
        const response = await fetch(USERS_ENDPOINT, { method: "GET" });
        if (response.ok) {
          const data = await response.json();
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
    return <div className="text-white p-4">Please sign in to view matches.</div>;
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
    <div className="min-h-screen text-white flex flex-col">
      <div className="sticky top-0 z-30 bg-[#121212] px-5 py-4 shadow-sm border-b border-gray-700">
        <h1 className="text-2xl font-bold text-center tracking-tight">{headerText}</h1>
        <p className="text-sm text-gray-400 text-center mt-1">{subHeaderText}</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {loading ? (
          <div className="p-5">
            <ProfileSkeleton />
            <ProfileSkeleton />
            <ProfileSkeleton />
          </div>
        ) : filteredProfiles.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            {profileType === "solo"
              ? "No musicians match your preferences yet."
              : "No band openings match your preferences yet."}
          </div>
        ) : (
          <ProfileList header="" profiles={filteredProfiles} />
        )}
      </div>

      <NavBar />
    </div>
  );
}

export default SearchProfiles;
