const initialPlay = {
  songPlay: false,
};

const player = (state = initialPlay, action) => {
  switch (action.type) {
    case "progress":
      return { ...state, songPlay: action.payload };
    default:
      return state;
  }
};
export default player;
