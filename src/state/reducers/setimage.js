const initialState = {
  image: localStorage.getItem("image") || "",
};

const artistImage = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IMAGE":
      localStorage.setItem("image", action.payload);
      return { ...state, heading: action.payload };
    default:
      return state;
  }
};
export default artistImage;
