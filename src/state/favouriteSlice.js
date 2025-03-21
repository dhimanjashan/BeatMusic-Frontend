import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: JSON.parse(localStorage.getItem("favoriteSongs")) || [], // ✅ Load from localStorage
};

// Fetch favorites from backend
export const fetchFavorites = (userID) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/favSongs/${userID}`
    );
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
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.songs = action.payload;
      localStorage.setItem("favoriteSongs", JSON.stringify(action.payload)); // ✅ Save to localStorage
    },
    addFavorite: (state, action) => {
      state.songs.push(action.payload);
      localStorage.setItem("favoriteSongs", JSON.stringify(state.songs)); // ✅ Save updated list
    },
    removeFavorite: (state, action) => {
      state.songs = state.songs.filter((song) => song.id !== action.payload);
      localStorage.setItem("favoriteSongs", JSON.stringify(state.songs)); // ✅ Save after removal
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
