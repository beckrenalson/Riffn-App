import { useEffect, useState } from "react";
import BackBtn from "../BackBtn"
import NavBar from "../NavBar"
import ProfileList from "./ProfileList"
import { useLocation } from "react-router-dom";


function Search() {

  const currentUser = {
    profileImage: null,
    userName: "",
    firstName: "Liam",
    lastName: "Patel",
    email: "liam.patel@gmail.com",
    password: "liamsecure456",
    profileType: "solo",
    selectedInstruments: ["Vocals"],
    selectedGenres: ["Synth Pop"],
    location: "Hamilton",
    openings: {
      instruments: [],
      genres: []
    },
    bandMembers: []
  };



  const API_URL = "http://localhost:5000";

  const [users, setUsers] = useState([])

  useEffect(() => {

    async function fetchUsers() {
      const response = await fetch(`${API_URL}/users`, {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    }

    fetchUsers()
  }, [])

  // console.log(users)


  const findMatchingBand = (currentUser, bands) => {

    const bandInstruments = bands.openings.instruments;
    const bandGenres = bands.openings.genres;
    const bandLocation = bands.location

    const { selectedInstruments: userInstruments, selectedGenres: userGenres, location: userLocation } = currentUser

    const isInstrumentMatch = userInstruments[0] === bandInstruments[0]
    const isGenreMatch = userGenres[0] === bandGenres[0]
    const isLocationMatch = userLocation === bandLocation

    // console.log(typeof userLocation)

    // Only check if first instrument or genre is a match, research find method to solve this 

    if (isInstrumentMatch && isGenreMatch && isLocationMatch) {
      return true;
    }
  }

  const bands = users.filter((user) => user.profileType === "band")

  // console.log(bands)

  const matches = bands.filter((band) => findMatchingBand(currentUser, band));

  console.log(matches)

  return (
    <>
      <BackBtn />
      <ProfileList />
      <NavBar />
    </>
  )
}

export default Search