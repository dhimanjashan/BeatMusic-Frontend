import React from "react";
import { useSelector } from "react-redux";
import PlayerControl from "./PlayerControl";
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

const Musiclist = ({ image, music, artistHeading }) => {
  const heading = useSelector((state) => state.string.heading);
  return (
    <>
      <h1 id="musiclistheading">{heading}</h1>
      <hr></hr>
      <ArtistImages image={image} />
      <div>
        {heading === "Hanji Shoneyo Suniye Song Nimrat Khaira De 🎵" ? (
          <NimratSongs />
        ) : (
          ""
        )}
        {heading === "Hanji Shoneyo Suniye Song Amrinder Gill De 🎵" ? (
          <AmrinderGill />
        ) : (
          ""
        )}
        {heading === "Hanji Shoneyo Suniye Song Sunanda Sharma De 🎵" ? (
          <SunandaSharma />
        ) : (
          ""
        )}
        {heading === "Hanji Shoneyo Suniye Song Arjan Dhillon De 🎵" ? (
          <ArjanDhillon />
        ) : (
          ""
        )}
        {heading === "Hanji Shoneyo Suniye Song Jordan Sandhu De 🎵" ? (
          <JordanSandhu />
        ) : (
          ""
        )}

        {heading === "Here is the list of Ed Sheeran Songs 🎵" ? (
          <EdSheeran />
        ) : (
          ""
        )}
        {heading === "Here is the list of Dua Lipa Songs 🎵" ? <DuaLipa /> : ""}
        {heading === "Here is the list of Justin Bieber Songs 🎵" ? (
          <DuaLipa />
        ) : (
          ""
        )}
        {heading === "Here is the list of Olivia Rodrigo Songs 🎵" ? (
          <OliviaRodrigo />
        ) : (
          ""
        )}
        {heading === "Here is the list of Sam Smith Songs 🎵" ? (
          <SamSmith />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Musiclist;
