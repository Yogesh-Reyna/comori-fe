import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,

      /**
       * Login user
       * Stores user information and authentication token.
       */
      login: (user, accessToken) =>
        set({
          user,
          accessToken,
          isAuthenticated: true,
        }),

      /**
       * Update user details.
       * Useful after profile update without affecting auth state.
       */
      updateUser: (user) =>
        set((state) => ({
          user: {
            ...state.user,
            ...user,
          },
        })),

      /**
       * Logout user
       * Clears all authentication data.
       */
      logout: () => set(initialState),
    }),
    {
      name: "comori-auth",

      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);

export default useAuthStore;
