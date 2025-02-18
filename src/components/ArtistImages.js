import React from "react";

const ArtistImages = ({ image }) => {
  return (
    <>
      <div className="musiclistImage">
        <div id="artistImage">
          <img src={image}></img>
        </div>
      </div>
    </>
  );
};

export default ArtistImages;
