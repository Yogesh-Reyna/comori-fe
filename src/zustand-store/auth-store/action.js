import { useAuthStore } from ".";

/**
 * Login user
 * Stores user information and authentication token.
 */
export const login = (user, accessToken) => {
  useAuthStore.setState(() => ({
    user,
    accessToken,
    isAuthenticated: true,
  }));
};

/**
 * Update user details.
 * Useful after profile update without affecting auth state.
 */
export const updateUser = (user) => {
  useAuthStore.setState((state) => ({
    user: {
      ...state.user,
      ...user,
    },
  }));
};

/**
 * Logout user
 * Clears all authentication data.
 */
export const logout = () => {
  useAuthStore.setState(() => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
  }));
};
