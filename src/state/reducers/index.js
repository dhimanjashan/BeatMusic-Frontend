import { combineReducers } from "redux";
import setstring from "./setstring";
import setSong from "./setSong";
import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "../audioSlice";

const rootReducer = combineReducers({
  string: setstring,
  player: setSong,
  audio: audioReducer,
});

export default rootReducer;

