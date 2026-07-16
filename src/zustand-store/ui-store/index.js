import { create } from "zustand";

const initialState = {
  loading: false,

  toast: {
    visible: false,
    message: "",
    type: "info",
  },

  sidebarOpen: false,
};

export const useUiStore = create(() => ({
  ...initialState,
}));
