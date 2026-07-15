import { create } from "zustand";

const initialState = {
  storeModalKey: [],
};

export const useModalStore = create(() => ({
  ...initialState,
}));
