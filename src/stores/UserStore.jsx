import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../services/api"; // Import the new api service

const UserStore = create(
  persist(
    (set, get) => ({
      userData: {
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        profileType: "",
        selectedInstruments: [],
        selectedGenres: [],
        location: "",
        bandMembers: [],
        profileImage: null,
        bio: "",
        passkeyId: null, // <-- store passkey credential ID
      },

      // Set profile image
      setProfileImage: (file) =>
        set((state) => ({
          userData: {
            ...state.userData,
            profileImage: file,
          },
        })),

      // Set band members
      setBandMembers: (members) =>
        set((state) => ({
          userData: {
            ...state.userData,
            bandMembers: members,
          },
        })),

      isEditing: false,
      setIsEditing: (bool) => set({ isEditing: bool }),

      // General updater for userData
      setUserData: (updater) =>
        set((state) => {
          const updatedData =
            typeof updater === "function" ? updater(state.userData) : updater;
          return { userData: { ...state.userData, ...updatedData } };
        }),

      // Reset all signup data
      resetUserData: () =>
        set({
          userData: {
            userName: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            profileType: "",
            selectedInstruments: [],
            selectedGenres: [],
            location: "",
            bandMembers: [],
            profileImage: null,
            bio: "",
            passkeyId: null,
          },
        }),

      // --- PASSKEY METHODS ---

      // Register passkey for the user
      registerPasskey: async (credentialId) => {
        const userId = get().userData._id;
        if (!userId) throw new Error("User not logged in");
        try {
          await api.post(`/users/${userId}/passkeys`, { credentialId }); // Use api.post
          set({
            userData: { ...get().userData, passkeyId: credentialId },
          });
        } catch (err) {
          console.error("Failed to register passkey:", err);
        }
      },

      // Login with passkey assertion
      loginWithPasskey: async (assertion) => {
        try {
          const res = await api.post("/users/passkey-login", assertion); // Use api.post

          if (res.status !== 200) throw new Error(res.data.message || "Passkey login failed");
          const data = res.data;
          set({ userData: data.user });
        } catch (err) {
          console.error("Passkey login error:", err);
          throw err;
        }
      },

      // Logout user
      logout: async () => {
        try {
          await api.post("/auth/logout"); // Call backend logout endpoint
          set({
            userData: {
              userName: "",
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              profileType: "",
              selectedInstruments: [],
              selectedGenres: [],
              location: "",
              bandMembers: [],
              profileImage: null,
              bio: "",
              passkeyId: null,
            },
          });
          // Clear the persisted state from local storage
          localStorage.removeItem("riffn-user-storage");
        } catch (err) {
          console.error("Logout error:", err);
        }
      },
    }),
    {
      name: "riffn-user-storage",
      partialize: (state) => ({
        userData: state.userData,
        isEditing: state.isEditing,
      }),
    }
  )
);

export default UserStore;
