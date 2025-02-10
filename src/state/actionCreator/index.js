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
