import { useState } from 'react'
import './App.css';
import UserHeader from './components/UserHeader';
import UserDetails from './components/UserDetails';
import BackBtn from './components/BackBtn';
import EditProfile from './components/EditProfile';

function UserProfile() {

  return (
    <>
    <BackBtn />
      <UserHeader 
      userName="User Name"
      profilePicture="./src/assets/profilepicture.png"
      />
      <div className="flex items-center flex-col">
        <div className='p-10'>
          <UserDetails
            details="User Name"
            icon="./src/assets/circle-user.png"
          />
          <UserDetails
            details="021 123 4567"
            icon="./src/assets/phone-flip.png"
          />
          <UserDetails
            details="SoundCloud"
            icon="./src/assets/soundcloud.png"
          />
          <UserDetails
            details="Spotify"
            icon="./src/assets/spotify.png"
          />
          <UserDetails
            details="email@gmail.com"
            icon="./src/assets/envelope.png"
          />
          <UserDetails
            details="Password"
            icon="./src/assets/eye.png"
          />
        </div>
        <EditProfile />
      </div>
    </>
  )
}

export default UserProfile
