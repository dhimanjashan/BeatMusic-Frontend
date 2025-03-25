import React from "react";

const ArtistImages = ({ image, isNavOpen }) => {
  return (
    <>
      <div
        className={
          isNavOpen ? "musiclistImage blur-background" : "musiclistImage"
        }
      >
        <div id="artistImage">
          <img src={image}></img>
        </div>
      </div>
    </>
  );
};

export default ArtistImages;
