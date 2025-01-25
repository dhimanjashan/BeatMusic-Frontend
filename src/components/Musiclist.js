import React from "react";
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
  return (
    <>
      <h1 id="musiclistheading">{artistHeading}</h1>
      <hr></hr>
      <ArtistImages image={image} />
      <div className="musicContainer1">
        <p style={{ cursor: "pointer" }}>
          {artistHeading === "Hanji Shoneyo Suniye Song Nimrat Khaira De" ? <NimratSongs /> : ""}
          {artistHeading === "Hanji Shoneyo Suniye Song Amrinder Gill De" ? <AmrinderGill /> : ""}
          {artistHeading === "Hanji Shoneyo Suniye Song Sunanda Sharma De" ? <SunandaSharma /> : ""}
          {artistHeading === "Hanji Shoneyo Suniye Song Arjan Dhillon De" ? <ArjanDhillon /> : ""}
          {artistHeading === "Hanji Shoneyo Suniye Song Jordan Sandhu De" ? <JordanSandhu /> : ""}

          {artistHeading === "Here is the list of Ed Sheeran Songs" ? <EdSheeran /> : ""}
          {artistHeading === "Here is the list of Dua Lipa Songs" ? <DuaLipa /> : ""}
          {artistHeading === "Here is the list of Justin Bieber Songs" ? <DuaLipa /> : ""}
          {artistHeading === "Here is the list of Olivia Rodrigo Songs" ? <OliviaRodrigo /> : ""}
          {artistHeading === "Here is the list of Sam Smith Songs" ? <SamSmith /> : ""}
        </p>
      </div>
      <PlayerControl />
    </>
  );
};

export default Musiclist;
