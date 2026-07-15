import { create } from 'zustand'

const useUiStore = create((set) => ({
  loading: false,

  toast: {
    visible: false,
    message: '',
    type: 'info',
  },

  sidebarOpen: false,

  setLoading: (value) => set({ loading: value }),

  showToast: (message, type = 'info') =>
    set({
      toast: {
        visible: true,
        message,
        type,
      },
    }),

  hideToast: () =>
    set({
      toast: {
        visible: false,
        message: '',
        type: 'info',
      },
    }),

  openSidebar: () => set({ sidebarOpen: true }),

  closeSidebar: () => set({ sidebarOpen: false }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}))

export default useUiStore
