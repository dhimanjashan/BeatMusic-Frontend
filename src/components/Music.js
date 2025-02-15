import React, { useState } from "react";
import PunjabiMusic from "./PunjabiMusic";
import Favourite from "./Favourite";

const MusicApp = ({ favouriteTitle }) => {
  return <div>{favouriteTitle && <Favourite title={favouriteTitle} />}</div>;
};

export default MusicApp;
