import { combineReducers } from "redux";
import setstring from "./setstring";
import setSong from "./setSong";
import audioReducer from "../audioSlice";
import favouriteReducer from "../favouriteSlice";
import stringSlice from "./stringSlice";
import setimage from "./setimage";


const rootReducer = combineReducers({
  string: setstring,
  player: setSong,
  audio: audioReducer,
  favourite: favouriteReducer,
  stringReducer:stringSlice,
  artistImage:setimage,
});

export default rootReducer;
