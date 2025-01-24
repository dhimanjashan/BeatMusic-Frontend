import React from "react";
import PlayerControl from "./PlayerControl";
import ArtistImages from "./ArtistImages";
import NimratSongs from "./NimratSongs";
import AmrinderGill from "./AmrinderGill";
import SunandaSharma from "./SunandaSharma";
import ArjanDhillon from "./ArjanDhillon";
import JordanSandhu from "./JordanSandhu";

const Musiclist = ({ image, music, artistname }) => {
  return (
    <>
      <h1 id="musiclistheading">Hanji Sohneyo Suniye Song {artistname} de</h1>
      <hr></hr>
      <ArtistImages image={image} />
      <div className="musicContainer1">
        <p style={{ cursor: "pointer" }}>
          {artistname === "Nimrat Khaira" ? <NimratSongs /> : ""}
          {artistname === "Amrinder Gill" ? <AmrinderGill /> : ""}
          {artistname === "Sunanda Sharma" ? <SunandaSharma /> : ""}
          {artistname === "Arjan Dhillon" ? <ArjanDhillon /> : ""}
          {artistname === "Jordan Sandhu" ? <JordanSandhu /> : ""}
        </p>
      </div>
      <PlayerControl />
    </>
  );
};

export default Musiclist;
