import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

export const useAuthStore = create(
  persist(
    () => ({
      ...initialState,
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
