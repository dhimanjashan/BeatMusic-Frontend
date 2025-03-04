import React from "react";
import Favourite from "./Favourite";

const MusicApp = ({ favouriteTitle }) => {
  return <div>{favouriteTitle && <Favourite title={favouriteTitle} />}</div>;
};

export default MusicApp;
