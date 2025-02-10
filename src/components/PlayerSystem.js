import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Favourite from "./Favourite";

const PlayerSystem = ({
  audio,
  isPlaying,
  handlePlayPause,
  handleNext,
  handlePrevious,
  song,
  handleRepeat,
}) => {
  const [progress, setProgress] = useState(0);
  const [showFavourite, setShowFavourite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100 || 0);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [audio, isPlaying]);

  const handleFavourite = () => {
    setShowFavourite(true);
    console.log(song);
    {
      showFavourite && <Favourite song={song} />;
    }
  };

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
