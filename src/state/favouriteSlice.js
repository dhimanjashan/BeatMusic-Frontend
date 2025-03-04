import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    favouriteSongs: [],
  },
  reducers: {
    addFavourite: (state, action) => {
      const song = action.payload;
      if (!state.favouriteSongs.some((fav) => fav.id === song.id)) {
        state.favouriteSongs.push(song);
      }
    },
    removeFavourite: (state, action) => {
      state.favouriteSongs = state.favouriteSongs.filter(
        (fav) => fav.id !== action.payload
      );
    },
  },
});

export const { addFavourite, removeFavourite } = favouriteSlice.actions;
export default favouriteSlice.reducer;
