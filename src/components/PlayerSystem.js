import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Favourite from "./Favourite";
import { useSelector } from "react-redux";

const PlayerSystem = ({
  audio,
  handlePlayPause,
  handleFavourite,
  handleNext,
  handlePrevious,
  song,
  handleRepeat,
}) => {
  const [progress, setProgress] = useState(0);
  const [showFavourite, setShowFavourite] = useState(false);
  const navigate = useNavigate();
  const { isPlaying, audioElement } = useSelector((state) => state.audio);

  useEffect(() => {
    if (!audioElement) return;

    const updateProgress = () => {
      if (audioElement.duration > 0) {
        setProgress(
          (audioElement.currentTime / audioElement.duration) * 100 || 0
        );
      }
    };

    audioElement.addEventListener("timeupdate", updateProgress);
    return () => {
      audioElement.removeEventListener("timeupdate", updateProgress);
    };
  }, [audioElement]);

  return (
    <>
      <div className="playerSystemContainer1">
        <div className="playerSystemProgressBar">
          <div
            className="progress"
            style={{ width: `${progress}%`, backgroundColor: "cornsilk" }}
          ></div>
        </div>
        <div className="playerSystemMusicplayerButton">
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
            onClick={handleFavourite}
            className="fa-solid fa-heart fa-sm"
            id="heart"
          ></i>
        </div>
      </div>
    </>
  );
};

export default PlayerSystem;
