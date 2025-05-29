import { useState } from 'react'
import UserHeader from './UserHeader';
import UserDetails from './UserDetails';
import BackBtn from '../BackBtn';
import EditProfile from './EditProfile';
import NavBar from '../NavBar';

function UserProfile() {

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
