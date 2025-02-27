const initialState = {
  heading: localStorage.getItem("heading") || "", // Load from localStorage if available
};

const stringReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HEADING":
      localStorage.setItem("heading", action.payload); // ✅ Save to localStorage
      return { ...state, heading: action.payload };
    default:
      return state;
  }
};

export default stringReducer;
