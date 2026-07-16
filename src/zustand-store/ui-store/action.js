import { useUiStore } from ".";

/**
 * Set loading state
 */
export const setLoading = (value) => {
  useUiStore.setState(() => ({
    loading: value,
  }));
};

/**
 * Show toast message
 */
export const showToast = (message, type = "info") => {
  useUiStore.setState(() => ({
    toast: {
      visible: true,
      message,
      type,
    },
  }));
};

/**
 * Hide toast message
 */
export const hideToast = () => {
  useUiStore.setState(() => ({
    toast: {
      visible: false,
      message: "",
      type: "info",
    },
  }));
};

/**
 * Open sidebar
 */
export const openSidebar = () => {
  useUiStore.setState(() => ({
    sidebarOpen: true,
  }));
};

/**
 * Close sidebar
 */
export const closeSidebar = () => {
  useUiStore.setState(() => ({
    sidebarOpen: false,
  }));
};

/**
 * Toggle sidebar
 */
export const toggleSidebar = () => {
  useUiStore.setState((state) => ({
    sidebarOpen: !state.sidebarOpen,
  }));
};
