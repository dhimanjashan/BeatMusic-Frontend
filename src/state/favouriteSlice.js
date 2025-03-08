import { createSlice } from "@reduxjs/toolkit";
// Fetch favorites from backend
export const fetchFavorites = (userID) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:5000/api/favSongs/${userID}`);
    const data = await response.json();

    if (response.ok && data.songs) {
      dispatch(setFavorites(data.songs)); // No need for extra fetch calls
    } else {
      console.error("Invalid data format received:", data);
    }
  } catch (error) {
    console.error("Error fetching favorites:", error);
  }
};



const favoriteSlice = createSlice({
  name: "favourite",
  initialState: {
    songs: [],
  },
  reducers: {
    setFavorites: (state, action) => {
      state.songs = action.payload;
    },
    addFavorite: (state, action) => {
      state.songs.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.songs = state.songs.filter(song => song.id !== action.payload);
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
