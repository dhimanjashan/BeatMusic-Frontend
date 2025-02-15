import { createSlice } from "@reduxjs/toolkit";

// Global Audio instance
const audioElement = new Audio();

const initialState = {
  audioElement,
  isPlaying: false,
  currentSong: null,
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    playAudio: (state, action) => {
      const { songUrl, song } = action.payload;

      if (!state.currentSong || state.currentSong.id !== song.id) {
        state.audioElement.src = songUrl;
        state.audioElement.load();
      }

      state.currentSong = song;
      state.isPlaying = true;
    },
    pauseAudio: (state) => {
      state.audioElement.pause();
      state.isPlaying = false;
    },
  },
});

export const { playAudio, pauseAudio } = audioSlice.actions;
export default audioSlice.reducer;
