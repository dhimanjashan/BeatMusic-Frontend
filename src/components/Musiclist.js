import React from "react";
import { useSelector } from "react-redux";
import ArtistImages from "./ArtistImages";
import NimratSongs from "./NimratSongs";
import AmrinderGill from "./AmrinderGill";
import SunandaSharma from "./SunandaSharma";
import ArjanDhillon from "./ArjanDhillon";
import JordanSandhu from "./JordanSandhu";
import EdSheeran from "./EdSheeran";
import DuaLipa from "./DuaLipa";
import OliviaRodrigo from "./OliviaRodrigo";
import SamSmith from "./SamSmith";

const Musiclist = () => {
  const heading = useSelector((state) => state.stringReducer.heading);
  let storedHeading = localStorage.getItem("heading");
  let storedImage = localStorage.getItem("image");
  return (
    <>
      <h1 className="musiclistheading1">{heading}</h1>
      <hr className="musiclistHr"></hr>
      <ArtistImages image={storedImage} />
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
        {storedHeading === "Here is the list of Ed Sheeran Songs 🎵" && (
          <EdSheeran />
        )}
        {storedHeading === "Here is the list of Dua Lipa Songs 🎵" && (
          <DuaLipa />
        )}
        {storedHeading === "Here is the list of Justin Bieber Songs 🎵" && (
          <DuaLipa />
        )}
        {storedHeading === "Here is the list of Olivia Rodrigo Songs 🎵" && (
          <OliviaRodrigo />
        )}
        {storedHeading === "Here is the list of Sam Smith Songs 🎵" && (
          <SamSmith />
        )}
      </div>
    </>
  );
};

export default Musiclist;
