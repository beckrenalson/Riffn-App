import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import ProfileList from "./ProfileList";
import { USERS_ENDPOINT } from "../../config/api";
import Loading from "../Loading";
import SignUpStore from "../CreateProfile/SignUpStore";
import BackBtn from "../BackBtn";

function BandSearch() {

  const currentUser = SignUpStore((state) => state.signUpData);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await fetch(USERS_ENDPOINT, {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUsers();
  }, []);

  const findMatchingBand = (currentUser, band) => {
    const bandInstruments = band.openings.instruments || [];
    const bandGenres = band.openings.genres || [];
    const bandLocation = band.location;

    const { selectedInstruments: userInstruments, selectedGenres: userGenres, location: userLocation } = currentUser;

    const isInstrumentMatch = bandInstruments.some(instrument =>
      userInstruments.includes(instrument)
    );

    const isGenreMatch = bandGenres.some(genre =>
      userGenres.includes(genre)
    );

    const isLocationMatch = userLocation === bandLocation;

    return isLocationMatch;
  };

  if (!currentUser || !currentUser.email) {
    return <div className="text-white p-4">Please sign in to view matches.</div>;
  }

  const bands = users.filter(user => user.profileType === "band");
  const matches = bands.filter(band => findMatchingBand(currentUser, band));

  console.log(matches)

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <div className="min-h-screen text-white flex flex-col">

        <div className="sticky top-0 z-30 bg-[#121212] px-5 py-4 shadow-sm border-b border-gray-700">
          <h1 className="text-2xl font-bold text-center tracking-tight">
            Band Openings
          </h1>
          <p className="text-sm text-gray-400 text-center mt-1">
            Matching local bands looking for musicians
          </p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {matches.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              No band openings match your preferences yet.
            </div>
          ) : (
            <ProfileList header="" profiles={matches} />
          )}
        </div>

        <NavBar />
      </div>
    </>

  );
}

export default BandSearch;
