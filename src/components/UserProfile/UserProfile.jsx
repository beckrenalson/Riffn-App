import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import UserHeader from './UserHeader';
import UserDetails from './UserDetails';
import BackBtn from '../BackBtn';
import SettingsBtn from './SettingsBtn';
import SelectLocation from '../CreateProfile/SelectLocation';
import UserStore from '../../stores/UserStore';
import api, { USERS_ENDPOINT } from '../../services/api'; // Import the new api service and USERS_ENDPOINT
import BandMembersInput from '../CreateProfile/BandMembersInput';
import MusicEmbed from './MusicEmbed';
import Bio from '../CreateProfile/Bio';

function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const userData = UserStore((state) => state.userData);
  const globalIsEditing = UserStore((state) => state.isEditing);
  const setGlobalIsEditing = UserStore((state) => state.setIsEditing);
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

    // Update selectedInstruments if coming from InstrumentSelection
    if (location.state?.selectedInstruments) {
      setFormData(prev => ({ ...prev, selectedInstruments: location.state.selectedInstruments }));
    }

    // Update selectedGenres if coming from GenreSelection
    if (location.state?.selectedGenres) {
      setFormData(prev => ({ ...prev, selectedGenres: location.state.selectedGenres }));
    }
  }, [userData, location.state]);

  // Fetch band member details only if they are ObjectId strings
  useEffect(() => {
    const fetchBandMemberDetails = async () => {
      const bandMembers = formData.bandMembers;

      // Only fetch if we have band members and they are strings (ObjectIds)
      if (!bandMembers?.length || typeof bandMembers[0] !== 'string') return;

      try {
        const memberPromises = bandMembers.map(async (memberId) => {
          const response = await api.get(`${USERS_ENDPOINT}/${memberId}`); // Use api.get
          if (response.status === 200) {
            return response.data;
          }
          return { _id: memberId, userName: 'Unknown Member' }; // fallback
        });

        const populatedMembers = await Promise.all(memberPromises);
        setFormData(prev => ({ ...prev, bandMembers: populatedMembers }));
      } catch (err) {
        console.error('Error fetching band member details:', err);
      }
    };

    fetchBandMemberDetails();
  }, [formData.bandMembers?.length, userData?._id]);

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

      const response = await api.patch(`${USERS_ENDPOINT}/${userData._id}`, payload); // Use api.patch

      if (response.status === 200) {
        const updated = response.data;

        // Update both formData and global store
        setFormData(updated);
        UserStore.getState().setUserData(updated);

        setIsEditing(false);
        setGlobalIsEditing(false);
        setPassword(""); // Clear password field

        console.log("Profile updated successfully");
      } else {
        const errData = response.data; // Assuming response.data contains error details
        console.error("Save failed:", errData);
      }
    } catch (err) {
      console.error("Error saving:", err);
    }
  };

  const handleCancel = () => {
    // Store the current populated band members before resetting
    const currentPopulatedMembers = formData.bandMembers;

    // Reset form data to original userData, but keep populated band members
    setFormData({
      _id: userData?._id,
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
      location: userData?.location || '',
      bandMembers: currentPopulatedMembers, // Keep the populated objects instead of reverting to ObjectIds
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
    <div className="min-h-screen bg-zinc-950">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-violet-950/20 via-zinc-950 to-blue-950/20 pointer-events-none"></div>

      {/* Navigation */}
      <div className="relative z-10">
        <div className="flex justify-between items-center px-6 py-4">
          <BackBtn />
          <SettingsBtn />
        </div>
      </div>

      {/* Profile Header */}
      <div className="relative z-10 px-6 pt-4">
        <UserHeader
          isEditing={isEditing}
          profileImage={formData.profileImage}
          setImage={(image) => setFormData({ ...formData, profileImage: image })}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-4 pt-8 pb-24">
        <div className="w-full max-w-2xl space-y-6">

          {/* Bio Section */}
          <div className="group">
            {isEditing ? (
              <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 transition-all duration-300 hover:border-violet-500/30">
                <label className="text-xs font-medium text-zinc-400 mb-3 block uppercase tracking-wider">
                  Bio
                </label>
                <Bio userData={formData} setUserData={setFormData} />
              </div>
            ) : (
              <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 transition-all duration-300 hover:border-zinc-700/50">
                <div className="text-zinc-300 whitespace-pre-line leading-relaxed text-sm">
                  {userData?.bio || (
                    <span className="text-zinc-500 italic">No bio provided.</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Personal Details */}
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-700/50">
            <div className="px-6 py-4 border-b border-zinc-800/50">
              <h3 className="text-zinc-100 font-semibold text-sm uppercase tracking-wider">Personal Details</h3>
            </div>

            <div className="divide-y divide-zinc-800/30 px-6 pt-6 pb-6">
              <UserDetails icon="/images/circle-user.png">
                {isEditing ? (
                  <div className="space-y-4 py-3">
                    <label className="block">
                      <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">First Name</span>
                      <input
                        className="w-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 rounded-xl px-4 py-3 mt-2 focus:border-violet-500 focus:bg-zinc-800/80 transition-all outline-none placeholder-zinc-500"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Last Name</span>
                      <input
                        className="w-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 rounded-xl px-4 py-3 mt-2 focus:border-violet-500 focus:bg-zinc-800/80 transition-all outline-none placeholder-zinc-500"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </label>
                  </div>
                ) : (
                  <span className="text-zinc-200 font-medium">
                    {`${userData?.firstName || ''} ${userData?.lastName || ''}`.trim() || 'No name provided'}
                  </span>
                )}
              </UserDetails>

              {userData?.profileType === "band" && (
                <UserDetails icon="/images/members.png">
                  {isEditing ? (
                    <div className="py-3">
                      <BandMembersInput
                        members={formData.bandMembers || []}
                        setMembers={(updated) =>
                          setFormData({ ...formData, bandMembers: updated })
                        }
                        currentUserId={userData?._id}
                      />
                    </div>
                  ) : (
                    <>
                      {formData?.bandMembers?.length > 0 ? (
                        <div className="flex flex-wrap gap-2 py-2">
                          {formData.bandMembers.map((member) => (
                            <div key={member._id || member} className="flex items-center gap-2 bg-zinc-800/50 px-3 py-2 rounded-lg border border-zinc-700/30 transition-all hover:border-violet-500/30">
                              <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-xs font-semibold text-white">
                                  {getMemberDisplayName(member).charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="text-sm text-zinc-300">{getMemberDisplayName(member)}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-zinc-500 italic text-sm">No band members added</span>
                      )}
                    </>
                  )}
                </UserDetails>
              )}

              <UserDetails icon="/images/land-layer-location.png">
                {isEditing ? (
                  <div className="py-3">
                    <SelectLocation
                      userData={formData}
                      handleChange={(e) =>
                        setFormData({ ...formData, [e.target.name]: e.target.value })
                      }
                    />
                  </div>
                ) : (
                  <span className="text-zinc-200">{userData?.location || "Location not set"}</span>
                )}
              </UserDetails>

              <UserDetails icon="/images/envelope.png">
                {isEditing ? (
                  <input
                    className="w-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 rounded-xl px-4 py-3 my-2 focus:border-violet-500 focus:bg-zinc-800/80 transition-all outline-none placeholder-zinc-500"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  <span className="text-zinc-200">{userData?.email || "Email not provided"}</span>
                )}
              </UserDetails>

              <UserDetails icon="/images/eye.png">
                {isEditing ? (
                  <input
                    className="w-full bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 rounded-xl px-4 py-3 my-2 focus:border-violet-500 focus:bg-zinc-800/80 transition-all outline-none placeholder-zinc-500"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                ) : (
                  <span className="text-zinc-400 font-mono text-sm">••••••••</span>
                )}
              </UserDetails>
            </div>
          </div>

          {/* Musical Info */}
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-700/50">
            <div className="px-6 py-4 border-b border-zinc-800/50">
              <h3 className="text-zinc-100 font-semibold text-sm uppercase tracking-wider">Musical Profile</h3>
            </div>

            <div className="divide-y divide-zinc-800/30 px-6 pt-6 pb-6">
              <UserDetails icon="/images/instruments/guitar.png">
                {isEditing ? (
                  <div className="flex justify-between items-center py-2 gap-3">
                    <span className="text-zinc-300">{formData.selectedInstruments?.join(", ") || "None selected"}</span>
                    <button
                      onClick={() => navigate("/signup/instruments?from=edit")}
                      className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium rounded-lg transition-all uppercase tracking-wider"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <span className="text-zinc-200">{userData?.selectedInstruments?.join(", ") || "No instruments selected"}</span>
                )}
              </UserDetails>

              <UserDetails icon="/images/music-alt.png">
                {isEditing ? (
                  <div className="flex justify-between items-center py-2 gap-3">
                    <span className="text-zinc-300">{formData.selectedGenres?.join(", ") || "None selected"}</span>
                    <button
                      onClick={() => navigate("/signup/genres?from=edit")}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg transition-all uppercase tracking-wider"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <span className="text-zinc-200">{userData?.selectedGenres?.join(", ") || "No genres selected"}</span>
                )}
              </UserDetails>
            </div>
          </div>

          {/* Music Embed */}
          <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-zinc-700/50">
            <div className="px-6 py-4 border-b border-zinc-800/50">
              <h3 className="text-zinc-100 font-semibold text-sm uppercase tracking-wider">Music</h3>
            </div>
            <div className="p-6">
              <MusicEmbed isEditing={isEditing} setIsEditing={setIsEditing} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 uppercase tracking-wider text-sm"
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
                className="flex-1 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/50 text-zinc-300 font-semibold rounded-xl px-6 py-4 transition-all duration-200 uppercase tracking-wider text-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;