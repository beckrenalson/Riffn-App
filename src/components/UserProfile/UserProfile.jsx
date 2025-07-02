import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserDetails from './UserDetails';
import BackBtn from '../BackBtn';
import NavBar from '../NavBar';
import SignOut from './SignOut';
import SelectLocation from '../CreateProfile/SelectLocation';
import SignUpStore from '../CreateProfile/SignUpStore';
import { USERS_ENDPOINT } from '../../config/api';

function UserProfile() {
  const navigate = useNavigate();

  const userData = SignUpStore((state) => state.signUpData);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    _id: userData?._id,
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    location: userData?.location || '',
    selectedInstruments: userData?.selectedInstruments || '',
    selectedGenres: userData?.selectedGenres || ''
  });

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
        setPassword(""); // Clear temp password field
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
        userName={`${userData.firstName} ${userData.lastName}`}
        bandName={userData.userName}
      />
      <div className="flex flex-col items-center px-4 pt-4 pb-24">
        <div className="w-full max-w-md">

          <UserDetails
            details={
              isEditing ? (
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
              )
            }
            icon="/images/circle-user.png"
          />

          <UserDetails details="SoundCloud" icon="/images/soundcloud.png" />
          <UserDetails details="Spotify" icon="/images/spotify.png" />

          <UserDetails
            details={
              isEditing ? (
                <SelectLocation
                  signUpData={formData}
                  handleChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: e.target.value })
                  }
                />
              ) : (
                userData.location
              )
            }
            icon="/images/land-layer-location.png"
          />

          <UserDetails
            details={
              isEditing ? (
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
            icon="/images/envelope.png"
          />

          <UserDetails
            details={
              isEditing ? (
                <input
                  className="w-full border rounded px-3 py-2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              ) : (
                '••••••••'
              )
            }
            icon="/images/eye.png"
          />

          <UserDetails
            details={
              isEditing ? (
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
              )
            }
            icon="/images/guitar.png"
          />

          <UserDetails
            details={
              isEditing ? (
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
              )
            }
            icon="/images/genre-icon.png"
          />

          <div className="flex gap-3 mt-4">
            <button
              className="flex-1 bg-gray-500 text-white rounded px-4 py-2"
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                  SignUpStore.getState().setIsEditing(true);
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
                  SignUpStore.getState().setIsEditing(false);
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
