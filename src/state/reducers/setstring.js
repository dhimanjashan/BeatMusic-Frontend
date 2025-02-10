const initialState = 0;

const string = (state = initialState, action) => {
  switch (action.type) {
    case "artist":
      return { ...state, heading: action.payload };
    default:
      return state;
  }
};

export default string;
