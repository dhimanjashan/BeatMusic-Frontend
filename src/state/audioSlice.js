import { createSlice } from "@reduxjs/toolkit";

// Create an Audio instance globally
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
    playAudio: {
      reducer: (state, action) => {
        const { songUrl, song } = action.payload;

        if (state.currentSong?.id !== song?.id) {
          state.audioElement.src = songUrl;
          state.audioElement.load();
          state.currentSong = song;
        }

        state.audioElement.oncanplaythrough = () => {
          state.audioElement.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
          state.isPlaying = true;
        };
      },
      prepare: (songUrl, song) => {
        return { payload: { songUrl, song } };
      },
    },
    pauseAudio: (state) => {
      state.audioElement.pause();
      state.isPlaying = false;
    },
  },
});

export const { playAudio, pauseAudio } = audioSlice.actions;
export default audioSlice.reducer;
