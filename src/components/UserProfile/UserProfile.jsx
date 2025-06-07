import { useState, useEffect } from 'react'
import UserHeader from './UserHeader';
import UserDetails from './UserDetails';
import BackBtn from '../BackBtn';
import EditProfile from './EditProfile';
import NavBar from '../NavBar';

function UserProfile() {

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/users/:id", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData)
        })
      } catch (error) {
        console.error("Error:", error)
      }
    }
  }, []);


  return (
    <>
      <BackBtn />
      <UserHeader
        userName='User Name'
        profilePicture="/images/profilepicture.png"
      />
      <div className="flex items-center flex-col">
        <div className='p-6 w-full'>
          <UserDetails
            details="User Name"
            icon="/images/circle-user.png"
          />
          <UserDetails
            details="021 123 4567"
            icon="/images/phone-flip.png"
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
            details="email@gmail.com"
            icon="/images/envelope.png"
          />
          <UserDetails
            details="Password"
            icon="/images/eye.png"
          />
        </div>
        <EditProfile />
      </div>
      <NavBar />
    </>
  )
}

export default UserProfile
