import { playAudio, nextSong } from "../audioSlice";

export const play = (songPlay) => {
  return (dispatch) => {
    dispatch({
      type: "progress",
      payload: Boolean(songPlay),
    });
  };
};

export const artistHeadline = (heading) => {
  return (dispatch) => {
    dispatch({
      type: "artist",
      payload: String(heading),
    });
  };
};

  export const playAudioAction = (songUrl, song) => {
    return (dispatch, getState) => {
      const { audio } = getState();
      const { audioElement } = audio;
  
      if (!audioElement.src || audioElement.src !== songUrl) {
        // Stop previous playback
        audioElement.pause();
        audioElement.currentTime = 0;
  
        audioElement.src = songUrl;
        audioElement.load();
      }
  
      audioElement
        .play()
        .then(() => {
          dispatch({
            type: "audio/play",
            payload: { song, songUrl },
          });
        })
        .catch((error) => console.error("Error playing audio:", error));
    };
  };
  

export const pauseAudioAction = () => {
  return (dispatch, getState) => {
    const { audio } = getState();
    const { audioElement } = audio;

    audioElement.pause();
    dispatch({
      type: "audio/pause",
    });
  };
};

export const handleNextSong = () => async (dispatch, getState) => {
  const { playlist, currentSong, audioElement } = getState().audio;
  const currentIndex = playlist.findIndex(song => song.id === currentSong?.id);

  if (currentIndex !== -1 && currentIndex < playlist.length - 1) {
    const nextSongData = playlist[currentIndex + 1];

    try {
      const response = await fetch("http://172.20.10.4:5000/files/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId: nextSongData.id }),
      });
      const data = await response.json();

      if (data.file_path) {
        audioElement.src = data.file_path;
        audioElement.load();
        audioElement.play(); // ✅ Ensures playback starts

        dispatch(playAudio({ songUrl: data.file_path, song: nextSongData }));
      }
    } catch (error) {
      console.error("Error fetching next song:", error);
    }
  } else {
    console.log("No more songs left!");
  }
};


export const setupAudioListeners = () => (dispatch, getState) => {
  const { audioElement } = getState().audio;

  if (!audioElement) return;

  audioElement.onended = () => {
    console.log("Song ended, playing next...");
    dispatch(handleNextSong()); // ✅ Dispatch a function (allowed by thunk)
  };
};