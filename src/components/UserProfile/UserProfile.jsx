import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserDetails from './UserDetails';
import BackBtn from '../BackBtn';
import NavBar from '../NavBar';
import SignOut from './SignOut';
import SelectLocation from '../CreateProfile/SelectLocation';
import SignUpStore from '../CreateProfile/SignUpStore';
import { USERS_ENDPOINT } from '../../config/api';
import BandMembersInput from '../CreateProfile/BandMembersInput';

function UserProfile() {
  const navigate = useNavigate();

  const userData = SignUpStore((state) => state.signUpData);
  const globalIsEditing = SignUpStore((state) => state.isEditing);
  const setGlobalIsEditing = SignUpStore((state) => state.setIsEditing);
  const [isEditing, setIsEditing] = useState(false);


  const [formData, setFormData] = useState({
    _id: userData?._id,
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    location: userData?.location || '',
    bandMembers: userData?.bandMembers || [],
    selectedInstruments: userData?.selectedInstruments || [],
    selectedGenres: userData?.selectedGenres || [],
    profileImage: userData?.profileImage || ''
  });

  useEffect(() => {
    setIsEditing(globalIsEditing);
  }, [globalIsEditing]);

  useEffect(() => {
    setFormData({
      _id: userData?._id,
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
      location: userData?.location || '',
      bandMembers: userData?.bandMembers || [],
      selectedInstruments: userData?.selectedInstruments || [],
      selectedGenres: userData?.selectedGenres || [],
      profileImage: userData?.profileImage || ''
    });
  }, [userData]);

  const [password, setPassword] = useState("");

  const handleSave = async () => {
    try {
      const payload = { ...formData };
      if (password) {
        payload.password = password;
      }

      const response = await fetch(`${USERS_ENDPOINT}/${userData._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updatedData = await response.json();
        SignUpStore.getState().setSignUpData(updatedData);
        setIsEditing(false);
        SignUpStore.getState().setIsEditing(false);
        setPassword("");
      } else {
        console.error("Failed to update");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <BackBtn />
      <UserHeader
        isEditing={isEditing}
        profileImage={formData.profileImage}
        setImage={(image) => setFormData({ ...formData, profileImage: image })}
      />

      <div className="flex flex-col items-center px-4 pt-4 pb-24">
        <div className="w-full max-w-md">

          <UserDetails icon="/images/circle-user.png">
            {isEditing ? (
              <div className="space-y-2">
                <label className="block">
                  <span className="text-sm text-gray-500">First Name</span>
                  <input
                    className="w-full border rounded px-3 py-2 mt-1"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-500">Last Name</span>
                  <input
                    className="w-full border rounded px-3 py-2 mt-1"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </label>
              </div>
            ) : (
              `${userData.firstName} ${userData.lastName}`
            )}
          </UserDetails>

          {userData.profileType === "band" && (
            <UserDetails icon="/images/members.png">
              {isEditing ? (
                <BandMembersInput
                  members={formData.bandMembers}
                  setMembers={(updated) => setFormData({ ...formData, bandMembers: updated })}
                />
              ) : (
                userData.bandMembers?.join(", ") || "None selected"
              )}
            </UserDetails>
          )}

          <UserDetails icon="/images/soundcloud.png" />
          <UserDetails icon="/images/spotify.png" />

          <UserDetails icon="/images/land-layer-location.png">
            {isEditing ? (
              <SelectLocation
                signUpData={formData}
                handleChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
              />
            ) : (
              userData.location
            )}
          </UserDetails>

          <UserDetails icon="/images/envelope.png">
            {isEditing ? (
              <input
                className="w-full border rounded px-3 py-2"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            ) : (
              userData.email
            )
            }
          </UserDetails>

          <UserDetails icon="/images/eye.png">
            {isEditing ? (
              <input
                className="w-full border rounded px-3 py-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            ) : (
              '••••••••'
            )}
          </UserDetails>

          <UserDetails icon="/images/instruments/guitar.png">
            {isEditing ? (
              <div className="flex justify-between items-center">
                <span>{formData.selectedInstruments?.join(", ") || "None selected"}</span>
                <button
                  onClick={() => navigate("/signup/instruments?from=edit")}
                  className="ml-3 text-blue-500 hover:underline text-sm"
                >
                  Edit
                </button>
              </div>
            ) : (
              userData.selectedInstruments?.join(", ") || "None selected"
            )}
          </UserDetails>

          <UserDetails icon="/images/music-alt.png">

            {isEditing ? (
              <div className="flex justify-between items-center">
                <span>{formData.selectedGenres?.join(", ") || "None selected"}</span>
                <button
                  onClick={() => navigate("/signup/genres")}
                  className="ml-3 text-blue-500 hover:underline text-sm"
                >
                  Edit
                </button>
              </div>
            ) : (
              userData.selectedGenres?.join(", ") || "None selected"
            )}
          </UserDetails>

          <div className="flex gap-3 mt-4">
            <button
              className="flex-1 bg-gray-500 text-white rounded px-4 py-2"
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                  setGlobalIsEditing(true);
                }
              }}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
            {isEditing && (
              <button
                className="flex-1 border border-gray-300 rounded px-4 py-2"
                onClick={() => {
                  setIsEditing(false);
                  setGlobalIsEditing(false);
                }}
              >
                Cancel
              </button>
            )}
          </div>

          <div className='flex justify-center pt-6'>
            <SignOut />
          </div>

        </div>
      </div>
      <NavBar />
    </>
  );
}

export default UserProfile;
