import { useEffect, useState } from 'react'
import UserHeader from './UserHeader';
import UserDetails from './UserDetails';
import BackBtn from '../BackBtn';
import EditProfile from './EditProfile';
import NavBar from '../NavBar';
import SignOut from './SignOut';
import SignUpStore from '../CreateProfile/SignUpStore';

function UserProfile() {
  const API_URL = import.meta.env.VITE_RIFFN_API;

  const userData = SignUpStore((state) => state.signUpData);

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    _id: userData._id,
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    email: userData.email || '',
    password: userData.password || ''
  })

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
            details={
              isEditing ? (
                <div className='flex flex-col'>
                  <input
                    autoFocus
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              ) : (
                `${userData.firstName} ${userData.lastName}`
              )
            }
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
            details={
              isEditing ? (
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              ) : (
                `${userData.email}`
              )
            }
            icon="/images/envelope.png"
          />
          <UserDetails
            details={

              isEditing ? (
                <input
                  type="text"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              ) : (
                `${userData.password}`
              )
            }
            icon="/images/eye.png"
          />
          {/* <UserDetails 
            details={userData.selectedInstruments}
          
          />
          <UserDetails 
            details={userData.selectedGenres}
          /> */}
        </div>
        <button
          className='border p-2'
          onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit profile"}
        </button>
        {isEditing && (
          <button
            className='border p-2'
            onClick={async () => {
              try {
                const response = await fetch(`${API_URL}/users/${userData._id}`, {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(formData)
                });

                if (response.ok) {
                  const updatedData = await response.json();
                  SignUpStore.getState().setSignUpData(updatedData);
                  setIsEditing(false);
                } else {
                  console.error("Failed to update");
                }
              } catch (error) {
                console.error("Error:", error);
              }
            }}
          >
            Save changes
          </button>
        )}
        <SignOut />
      </div>
      <NavBar />
    </>
  )
}

export default UserProfile
