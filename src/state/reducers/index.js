import { combineReducers } from "redux";
import setstring from "./setstring";
import setSong from "./setSong";
import audioReducer from "../audioSlice";
import favouriteReducer from "../favouriteSlice";

const rootReducer = combineReducers({
  string: setstring,
  player: setSong,
  audio: audioReducer,
  favourite: favouriteReducer,
});

export default rootReducer;
