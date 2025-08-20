import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserDetails from './UserDetails';
import BackBtn from '../BackBtn';
import SettingsBtn from './SettingsBtn';
import NavBar from '../NavBar';
import SelectLocation from '../CreateProfile/SelectLocation';
import SignUpStore from '../CreateProfile/SignUpStore';
import { USERS_ENDPOINT } from '../../config/api';
import BandMembersInput from '../CreateProfile/BandMembersInput';
import MusicEmbed from './MusicEmbed';
import Bio from '../CreateProfile/Bio';

function UserProfile() {
  const navigate = useNavigate();

  const userData = SignUpStore((state) => state.signUpData);
  const globalIsEditing = SignUpStore((state) => state.isEditing);
  const setGlobalIsEditing = SignUpStore((state) => state.setIsEditing);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("riffn-user-storage");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        SignUpStore.getState().setSignUpData(parsedUser);
      } catch (e) {
        console.error("Failed to parse localStorage user:", e);
      }
    }
  }, []);

  const [formData, setFormData] = useState({
    _id: userData?._id,
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    location: userData?.location || '',
    bandMembers: userData?.bandMembers || [],
    selectedInstruments: userData?.selectedInstruments || [],
    selectedGenres: userData?.selectedGenres || [],
    profileImage: userData?.profileImage || '',
    bio: userData?.bio || ''
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
      profileImage: userData?.profileImage || '',
      bio: userData?.bio || ''
    });
  }, [userData]);

  const [password, setPassword] = useState("");

  const handleSave = async () => {
    try {
      // Ensure we only send IDs for relationships
      const payload = {
        ...formData,
        bandMembers: (formData.bandMembers || []).map(m =>
          typeof m === "string" ? m : m._id
        ),
        bands: (formData.bands || []).map(b =>
          typeof b === "string" ? b : b._id
        ),
      };

      // Only include password if it was changed
      if (password.trim()) {
        payload.password = password;
      }

      const response = await fetch(`${USERS_ENDPOINT}/${userData._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updated = await response.json();

        // Update both formData and global store
        setFormData(updated);
        SignUpStore.getState().setSignUpData(updated);

        // Update localStorage
        localStorage.setItem("riffn-user-storage", JSON.stringify(updated));

        setIsEditing(false);
        setGlobalIsEditing(false);
        setPassword(""); // Clear password field

        console.log("Profile updated successfully");
      } else {
        const errData = await response.json();
        console.error("Save failed:", errData);
      }
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  const handleCancel = () => {
    // Reset form data to original userData
    setFormData({
      _id: userData?._id,
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
      location: userData?.location || '',
      bandMembers: userData?.bandMembers || [],
      selectedInstruments: userData?.selectedInstruments || [],
      selectedGenres: userData?.selectedGenres || [],
      profileImage: userData?.profileImage || '',
      bio: userData?.bio || ''
    });
    setPassword("");
    setIsEditing(false);
    setGlobalIsEditing(false);
  };

  // Helper function to display member names
  const getMemberDisplayName = (member) => {
    if (typeof member === "string") {
      return member; // fallback for ObjectId strings
    }
    return member.userName || `${member.firstName || ""} ${member.lastName || ""}`.trim() || "Unknown Member";
  };

  return (
    <>
      <div className="flex justify-between">
        <BackBtn />
        <SettingsBtn />
      </div>

      <UserHeader
        isEditing={isEditing}
        profileImage={formData.profileImage}
        setImage={(image) => setFormData({ ...formData, profileImage: image })}
      />

      <div className="flex flex-col items-center px-4 pt-4 pb-24">
        <div className="w-full max-w-md">

          <div className="my-4">
            {isEditing ? (
              <>
                <label className="text-sm text-gray-600 mb-1 block">Bio</label>
                <Bio signUpData={formData} setSignUpData={setFormData} />
              </>
            ) : (
              <div className="bg-gray-200 text-gray-800 p-4 rounded-2xl whitespace-pre-line leading-relaxed">
                {userData?.bio || (
                  <span className="text-gray-400 italic">No bio provided.</span>
                )}
              </div>
            )}
          </div>

          <div className="border border-gray-500 rounded-2xl p-4 mb-6">
            <UserDetails icon="/images/circle-user.png">
              {isEditing ? (
                <div className="space-y-2">
                  <label className="block">
                    <span className="text-sm text-gray-500">First Name</span>
                    <input
                      className="w-full border rounded-xl px-3 py-2 mt-1"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-500">Last Name</span>
                    <input
                      className="w-full border rounded-xl px-3 py-2 mt-1"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </label>
                </div>
              ) : (
                `${userData?.firstName || ''} ${userData?.lastName || ''}`.trim() || 'No name provided'
              )}
            </UserDetails>

            {userData?.profileType === "band" && (
              <UserDetails icon="/images/members.png">
                {isEditing ? (
                  <BandMembersInput
                    members={formData.bandMembers || []}
                    setMembers={(updated) =>
                      setFormData({ ...formData, bandMembers: updated })
                    }
                    currentUserId={userData?._id}
                  />
                ) : (
                  <>
                    {userData?.bandMembers?.length > 0 ? (
                      <div className="space-y-1">
                        {userData.bandMembers.map((member, index) => (
                          <div key={index} className="text-sm">
                            {getMemberDisplayName(member)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      "No band members added"
                    )}
                  </>
                )}
              </UserDetails>
            )}

            <UserDetails icon="/images/land-layer-location.png">
              {isEditing ? (
                <SelectLocation
                  signUpData={formData}
                  handleChange={(e) =>
                    setFormData({ ...formData, [e.target.name]: e.target.value })
                  }
                />
              ) : (
                userData?.location || "Location not set"
              )}
            </UserDetails>

            <UserDetails icon="/images/envelope.png">
              {isEditing ? (
                <input
                  className="w-full border rounded-xl px-3 py-2"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              ) : (
                userData?.email || "Email not provided"
              )}
            </UserDetails>

            <UserDetails icon="/images/eye.png">
              {isEditing ? (
                <input
                  className="w-full border rounded-xl px-3 py-2"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password (leave blank to keep current)"
                />
              ) : (
                '••••••••'
              )}
            </UserDetails>
          </div>

          <div className="border border-gray-500 rounded-2xl p-4 mb-6">
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
                userData?.selectedInstruments?.join(", ") || "No instruments selected"
              )}
            </UserDetails>

            <UserDetails icon="/images/music-alt.png">
              {isEditing ? (
                <div className="flex justify-between items-center">
                  <span>{formData.selectedGenres?.join(", ") || "None selected"}</span>
                  <button
                    onClick={() => navigate("/signup/genres?from=edit")}
                    className="ml-3 text-blue-500 hover:underline text-sm"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                userData?.selectedGenres?.join(", ") || "No genres selected"
              )}
            </UserDetails>
          </div>

          <div className="border border-gray-500 rounded-2xl p-4">
            <MusicEmbed isEditing={isEditing} setIsEditing={setIsEditing} />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              className="flex-1 bg-gray-500 text-white font-semibold py-3 px-6 rounded-2xl hover:bg-gray-600 transition-colors"
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
                className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 hover:bg-gray-50 transition-colors"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
}

export default UserProfile;