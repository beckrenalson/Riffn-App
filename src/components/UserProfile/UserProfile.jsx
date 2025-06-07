import { useEffect } from 'react'
import UserHeader from './UserHeader';
import UserDetails from './UserDetails';
import BackBtn from '../BackBtn';
import EditProfile from './EditProfile';
import NavBar from '../NavBar';
import SignOut from './SignOut';
import SignUpStore from '../CreateProfile/SignUpStore';

function UserProfile() {

  const userData = SignUpStore((state) => state.signUpData);

  if (!userData) return <div>Loading...</div>;

  // useEffect(() => {
  //   const loadProfile = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/users/:id", {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       })
  //     } catch (error) {
  //       console.error("Error:", error)
  //     }
  //   }
  // }, []);


  return (
    <>
      <BackBtn />
      <UserHeader
        userName={`${userData.firstName} ${userData.lastName}`}
        profilePicture="/images/profilepicture.png"
      />
      <div className="flex items-center flex-col">
        <div className='p-6 w-full'>
          <UserDetails
            details={`${userData.firstName} ${userData.lastName}`}
            icon="/images/circle-user.png"
          />
          <UserDetails
            details="SoundCloud"
            icon="/images/soundcloud.png"
          />
          <UserDetails
            details="Spotify"
            icon="/images/spotify.png"
          />
          <UserDetails
            details={userData.email}
            icon="/images/envelope.png"
          />
          <UserDetails
            details="Password"
            icon="/images/eye.png"
          />
        </div>
        <EditProfile />
        <SignOut />
      </div>
      <NavBar />
    </>
  )
}

export default UserProfile
