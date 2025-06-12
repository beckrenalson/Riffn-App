import BackBtn from "../BackBtn"
import NavBar from "../NavBar"
import ProfileList from "./ProfileList"

function Search(currentUser, allUsers) {
  return (
    <>
      <BackBtn />
      <NavBar />
    </>
  )
  // const { profileType, selectedInstruments, selectedGenres } = currentUser;

  // const oppositeType = profileType === "solo" ? "band" : "solo";

  // return allUsers.filter(user => {
  //   // Only compare to the opposite profile type
  //   if (user.profileType !== oppositeType) return false;

  //   // Bands must have "openings" defined
  //   const userInstruments = user.openings?.instruments || user.selectedInstruments || [];
  //   const userGenres = user.openings?.genres || user.selectedGenres || [];

  //   // Match on at least one instrument AND one genre
  //   const instrumentMatch = selectedInstruments.some(inst => userInstruments.includes(inst));
  //   const genreMatch = selectedGenres.some(genre => userGenres.includes(genre));

  //   return instrumentMatch && genreMatch;
  // });
}

export default Search