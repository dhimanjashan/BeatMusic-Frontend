import React from "react";
import PlayerControl from "./PlayerControl";

const Newmusic = () => {
  return (
    <>
      <div className="newmusicContainer">
        <h1 className="newmusicheading">
          Hanji Sohneyo Sunlo New Punjabi Songs
        </h1>
      </div>
      <hr></hr>
      <div className="newmusicimageContainer">
        <img
          src="portable-headset.png"
          className="newmusicImage"
          alt="headphone shape"
        ></img>
      </div>
      <div className="newmusicContainer1">
        <p style={{ cursor: "pointer" }}>
          Dildarian mp3 song download by Amrinder Gill in album Dildarian
        </p>
      </div>
      <PlayerControl />
    </>
  );
};

export default Newmusic;
