import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userID: null },
  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload; // Change state.user to state.userID
    },
  },
});
export const { setUserID } = userSlice.actions;
export default userSlice.reducer;
