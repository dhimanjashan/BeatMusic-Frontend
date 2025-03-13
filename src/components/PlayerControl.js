import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const PlayerControl = ({
  handleNext,
  handlePrevious,
  handlePlayPause,
  handleFavourite,
  handleRepeat,
}) => {
  const [progress, setProgress] = useState(0);
  const progressContainerRef = useRef(null);
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

  // Seek functionality when clicking on progress bar
  useEffect(() => {
    const progressContainer = progressContainerRef.current;
    if (!progressContainer || !audioElement) return;

    const handleProgressClick = (event) => {
      const rect = progressContainer.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      audioElement.currentTime = percentage * audioElement.duration;
      audioElement.play();
    };

    progressContainer.addEventListener("click", handleProgressClick);

    return () => {
      progressContainer.removeEventListener("click", handleProgressClick);
    };
  }, [audioElement]);
  const [repeat, setRepeat] = useState(false);

  const colorRepeat = () => {
    setRepeat((prevRepeat) => !prevRepeat); // Toggle repeat state
    handleRepeat();
  };

  return (
    <div className="musicContainer2">
      <div className="Musiclistcontainer">
        <div className="music-player">
          <div
            className="progress-bar"
            ref={progressContainerRef}
            style={{ cursor: "pointer" }}
          >
            <div
              className="progress"
              style={{ width: `${progress}%`, backgroundColor: "black" }}
            ></div>
          </div>
          <div className="music-playerButton">
            <i
              onClick={colorRepeat}
              className="fa-solid fa-repeat"
              style={{
                color: repeat ? "cornsilk" : "black",
                cursor: "pointer",
              }}
            ></i>
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
