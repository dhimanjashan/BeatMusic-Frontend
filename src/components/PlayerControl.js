import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PlayerControl = () => {
  const [musicaudio, setmusicaudio] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);
  const [isshow, setisshow] = useState(false);
  const [progress, setProgress] = useState(0);
  let audioRef = useRef(new Audio());
  const navigate = useNavigate();

  const handleClick = () => {
    setisPlaying(!isPlaying);
    setisshow(!isshow);
    if (musicaudio) {
      audioRef.current.pause();
      setmusicaudio(false);
    } else {
      audioRef.current.play();
      setmusicaudio(true);
    }
  };

  const handleFavourite = () => {
    // setHeading("Dildarian - Amrinder Gill.mp3");
  };

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      const progressPercentage = (audio.currentTime / audio.duration) * 100;
      setProgress(progressPercentage);
    };
    audio.addEventListener("timeupdate", updateProgress);
    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleClick);
    return () => {
      window.removeEventListener("keydown", handleClick);
    };
  }, [isPlaying]);

  return (
    <div className="musicContainer2">
      <div className="Musiclistcontainer">
        <div className="music-player">
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${progress}%`, backgroundColor: "cornsilk" }}
            ></div>
          </div>
          <div className="music-playerButton">
            <i className="fa-solid fa-bars fa-sm" id="musichamburger"></i>
            <i className="fa-solid fa-backward-fast fa-sm" id="previous"></i>
            <i
              className={`fa-solid fa-sm ${isPlaying ? "fa-pause" : "fa-play"}`}
              id="play"
              onClick={handleClick}
            ></i>
            <i className="fa-solid fa-forward-fast fa-sm" id="next"></i>
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
  setheading: PropTypes.func.isRequired,
};

export default PlayerControl;
