import { useModalStore } from ".";

export const openModal = (res) => {
  useModalStore.setState((state) => ({
    storeModalKey: [...state.storeModalKey, res],
  }));
};

export const closeModal = (...res) => {
  useModalStore.setState((state) => ({
    storeModalKey: state.storeModalKey.filter((s) => !res.includes(s)),
  }));
};

export const closeAllModals = () => {
  useModalStore.setState(() => ({
    storeModalKey: [],
  }));
};
