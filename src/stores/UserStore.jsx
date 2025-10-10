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
      _hasHydrated: false, // New state to track hydration
      setHasHydrated: (state) => set({ _hasHydrated: state }), // New action

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
      onRehydrateStorage: () => (state) => {
        state.setHasHydrated(true);
      },
    }
  )
);

export default UserStore;
