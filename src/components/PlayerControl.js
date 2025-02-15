import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PlayerControl = ({
  handleNext,
  handlePrevious,
  handlePlayPause,
  handleRepeat,
  handleFavourite,
}) => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const { isPlaying, audioElement } = useSelector((state) => state.audio);
  
  useEffect(() => {
    if (!audioElement) return;

    const updateProgress = () => {
      if (!audioElement.duration) return;
      const progressPercentage =
        (audioElement.currentTime / audioElement.duration) * 100;
      setProgress(progressPercentage || 0);
    };

    audioElement.addEventListener("timeupdate", updateProgress);

    return () => {
      audioElement.removeEventListener("timeupdate", updateProgress);
    };
  }, [audioElement]);

  

  return (
    <div className="musicContainer2">
      <div className="Musiclistcontainer">
        <div className="music-player">
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${progress}%`, backgroundColor: "black" }}
            ></div>
          </div>
          <div className="music-playerButton">
            <i onClick={handleRepeat} className="fa-solid fa-repeat"></i>
            <i
              onClick={handlePrevious}
              className="fa-solid fa-backward-fast fa-sm"
              id="previous"
            ></i>
            <i
              onClick={handlePlayPause}
              className={`fa-solid fa-sm ${isPlaying ? "fa-pause" : "fa-play"}`}
              id="play"
            ></i>
            <i
              onClick={handleNext}
              className="fa-solid fa-forward-fast fa-sm"
              id="next"
            ></i>
            <i
              className="fa-solid fa-heart fa-sm"
              id="heart"
              onClick={handleFavourite}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

PlayerControl.propTypes = {
  handleNext: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handlePlayPause: PropTypes.func.isRequired,
};

export default PlayerControl;
