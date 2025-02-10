import React from "react";
import PropTypes from "prop-types";

const Favourite = ({ song }) => {
  const handleclick = () => {
    console.log(song);
  };

  return (
    <>
      <div className="favouriteContainer1">
        <h1 id="favouriteHeading1">Hanji Mitro Chko Sode Favourite Songs</h1>
      </div>
      <hr />
      <div className="favouriteContainer2">
        <p onClick={handleclick} style={{ color: song ? "white" : "green" }}>
          {song ? `You favourited: ${song.title}` : "No song selected"}
        </p>
      </div>
    </>
  );
};

Favourite.propTypes = {
  heading: PropTypes.string,
};

export default Favourite;
