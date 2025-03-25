import React from "react";
import { useSelector } from "react-redux";
import ArtistImages from "./ArtistImages";
import NimratSongs from "./NimratSongs";
import AmrinderGill from "./AmrinderGill";
import SunandaSharma from "./SunandaSharma";
import ArjanDhillon from "./ArjanDhillon";
import JordanSandhu from "./JordanSandhu";

const Musiclist = ({ isNavOpen }) => {
  const heading = useSelector((state) => state.stringReducer.heading);
  let storedHeading = localStorage.getItem("heading");
  let storedImage = localStorage.getItem("image");
  return (
    <>
      <h1 className="musiclistheading1">{heading}</h1>
      <hr className="musiclistHr"></hr>
      <ArtistImages image={storedImage} isNavOpen={isNavOpen} />
      <div>
        {storedHeading === "Hanji Sohneyo Suniye Song Nimrat Khaira De 🎵" ? (
          <NimratSongs />
        ) : (
          ""
        )}
        {storedHeading === "Hanji Sohneyo Suniye Song Amrinder Gill De 🎵" && (
          <AmrinderGill />
        )}
        {storedHeading === "Hanji Sohneyo Suniye Song Sunanda Sharma De 🎵" && (
          <SunandaSharma />
        )}
        {storedHeading === "Hanji Sohneyo Suniye Song Arjan Dhillon De 🎵" && (
          <ArjanDhillon />
        )}
        {storedHeading === "Hanji Sohneyo Suniye Song Jordan Sandhu De 🎵" && (
          <JordanSandhu />
        )}
      </div>
    </>
  );
};

export default Musiclist;
