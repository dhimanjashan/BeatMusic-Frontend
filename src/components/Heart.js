import React from "react";

const Heart = () => {
  return (
    <>
      <div className="bigHeartContainer">
        <div className="heartContainer">
          <div className="heartcard">
            <div className="heartIcon">🎵</div>
            <h2>Enjoy Your Favorite Music</h2>
            <p>Save your favorite songs and create playlists by signing up.</p>
            <a href="/createaccount" className="heartBtn">
              Create an Account
            </a>
            <p>
              Already have an account?{" "}
              <a href="login" className="heartTag">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Heart;
