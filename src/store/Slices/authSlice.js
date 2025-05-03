/**
 * @fileoverview Redux slice for managing user authentication state.
 *
 * This slice handles the core authentication logic using Redux Toolkit. It manages
 * the user's authentication status, stores the JWT token, and the decoded user
 * information derived from the token.
 *
 * Features:
 * - Initial State Hydration: On application load, it attempts to retrieve the JWT
 *   token from localStorage. If a valid, non-expired token is found, the state
 *   is initialized with the user's data and isAuthenticated set to true, allowing
 *   session persistence. Otherwise, it defaults to a logged-out state.
 * - Login Handling (`loginSuccess` action): Updates the state upon successful login.
 *   It decodes the provided JWT, stores the user details and token in the state,
 *   sets isAuthenticated to true, and persists the token in localStorage. Includes
 *   error handling for invalid token decoding.
 * - Logout Handling (`logout` action): Clears the authentication state (user, token,
 *   isAuthenticated) and removes the token from localStorage.
 * - Selectors: Provides convenient selector functions (`selectCurrentUser`,
 *   `selectIsAuthenticated`, `selectToken`, role-specific selectors, etc.)
 *   to access specific pieces of the authentication state from components or other
 *   parts of the application without needing to know the exact state structure.
 *
 * State Shape:
 * {
 *   user: object | null,  // Decoded JWT payload containing user info (e.g., id, username, role)
 *   token: string | null, // The raw JWT token string
 *   isAuthenticated: boolean // Flag indicating if the user is currently authenticated
 * }
 */

import { TOKEN_KEY } from "@/utils/constants";
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const getInitialState = () => {
  const token =
    localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  if (token) {
    try {
      const decodedUser = jwtDecode(token);
      if (decodedUser.exp * 1000 > Date.now()) {
        return { user: decodedUser, token: token, isAuthenticated: true };
      }
    } catch (error) {
      console.error("Error decoding token on initial load:", error);
    }
  }
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  return { user: null, token: null, isAuthenticated: false };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, rememberMe } = action.payload;
      try {
        const decodedUser = jwtDecode(token);
        state.user = decodedUser;
        state.token = token;
        state.isAuthenticated = true;
        if (rememberMe) {
          localStorage.setItem(TOKEN_KEY, token);
        } else {
          sessionStorage.setItem(TOKEN_KEY, token);
        }
      } catch (error) {
        console.error("Failed to decode token on login:", error);
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(TOKEN_KEY);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectToken = (state) => state.auth.token;
export const selectUserRole = (state) => state.auth.user?.role;

export const selectIsAdmin = (state) => state.auth.user?.role === "admin";
export const selectIsInstructor = (state) =>
  state.auth.user?.role === "instructor";
export const selectIsStudent = (state) => state.auth.user?.role === "student";
export const selectHasRole = (role) => (state) =>
  state.auth.user?.role === role;
