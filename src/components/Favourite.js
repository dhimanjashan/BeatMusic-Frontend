import React from "react";
import PropTypes from "prop-types";

const Favourite = ({ heading }) => {
  return (
    <>
      <div className="favouriteContainer1">
        <h1 id="favouriteHeading1">Hanji Mitro Chko Sode Favourite Songs</h1>
      </div>
      <hr />
      <div className="favouriteContainer2">
        <h1 id="favouriteHeading2">
          {heading}
        </h1>
      </div>
    </>
  );
};

Favourite.propTypes = {
  heading: PropTypes.string,
};

export default Favourite;
