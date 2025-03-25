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
