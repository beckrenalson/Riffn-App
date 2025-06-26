import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import ProfileList from "./ProfileList";
import { USERS_ENDPOINT } from "../../config/api";
import Loading from "../Loading";
import SignUpStore from "../CreateProfile/SignUpStore";

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

  const solos = users.filter(user => user.profileType === "solo");
  const matches = solos.filter(solo => findMatchingBand(currentUser, solo));

  console.log(matches)

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="sticky top-0 z-20 bg-[#1a1a1a] px-4 py-3">
          <h1 className="text-3xl font-semibold text-white text-center tracking-tight">
            Solo Musicians
          </h1>
        </div>

        <div className="px-4 py-6">
          <ProfileList header="" profiles={matches} />
        </div>
        <NavBar />
      </div>
    </>
  );
}

export default BandSearch;
