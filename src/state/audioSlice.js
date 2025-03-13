import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  currentSong: null,
  audioElement: new Audio(),
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    playAudio: (state, action) => {
      state.isPlaying = true;
      state.currentSong = action.payload.song;
      state.audioElement.play();
    },
    pauseAudio: (state) => {
      state.isPlaying = false;
      state.audioElement.pause();
    },
    setAudioElement: (state, action) => {
      state.audioElement = action.payload;
    },
  },
});

export const { playAudio, pauseAudio, setAudioElement } = audioSlice.actions;
export default audioSlice.reducer;
