import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: !!localStorage.getItem("auth-token"), // ✅ Check token
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("auth-token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
