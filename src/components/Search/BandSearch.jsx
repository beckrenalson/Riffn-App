import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import ProfileList from "./ProfileList";
import { useLocation } from "react-router-dom";
import API_URL from "../../config/api";
import Loading from "../Loading";

function BandSearch() {
  const currentUser = {
    profileImage: null,
    userName: "",
    firstName: "Liam",
    lastName: "Patel",
    email: "liam.patel@gmail.com",
    password: "liamsecure456",
    profileType: "solo",
    selectedInstruments: ["Synth, Drums"],
    selectedGenres: ["Pop Rock"],
    location: "Tauranga",
    openings: {
      instruments: [],
      genres: [],
    },
    bandMembers: [],
  };

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_URL}/users`, {
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
      <div>
        <ProfileList header="Band openings" profiles={matches} />
      </div>
      <NavBar />
    </>
  );
}

export default BandSearch;
