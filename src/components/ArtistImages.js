import React from "react";

const ArtistImages = ({ image }) => {
  return (
    <>
      <div className="musiclistImage">
        <img src={image} id="artistImage"></img>
      </div>
    </>
  );
};

export default ArtistImages;
