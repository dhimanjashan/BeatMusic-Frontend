import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userID: null,
    userData: null,
  },
  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userID = null;
      state.userData = null;
    },
  },
});

export const { setUserID, setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
