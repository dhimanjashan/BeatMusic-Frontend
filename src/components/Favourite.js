import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import PlayerControl from "./PlayerControl";
import { playAudio, pauseAudio } from "../state/audioSlice";
import { fetchFavorites } from "../state/favouriteSlice";

const Favourite = () => {
  const userID = useSelector((state) => state.user.userID);
  const favouriteSongs = useSelector((state) => state.favourite.songs);
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const { isPlaying, currentSong, audioElement } = useSelector(
    (state) => state.audio
  );
  const [isLoading, setIsLoading] = useState(false);
  const [repeat, setRepeat] = useState(false);
  let i = 1;
  useEffect(() => {
    if (userID) {
      dispatch(fetchFavorites(userID)); // Fetch favorite songs when component loads
    }
  }, [dispatch, userID]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleClick = async (songIndex) => {
    if (isLoading) return;
    setIsLoading(true);
    const song = favouriteSongs[songIndex];
    try {
      const response = await fetch("http://172.20.10.4:5000/files/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId: song.id }),
      });

      const data = await response.json();
      if (!data.file_path || typeof data.file_path !== "string") {
        console.error("Invalid file path received:", data.file_path);
        return;
      }

      audioElement.src = data.file_path;
      audioElement.load();

      audioElement.oncanplaythrough = () => {
        audioElement
          .play()
          .then(() => {
            dispatch(playAudio({ songUrl: data.file_path, song }));
          })
          .catch((error) => {
            console.error("Error playing audio:", error);
          });
      };
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    if (isLoading || !currentSong) return;

    const currentIndex = favouriteSongs.findIndex(
      (song) => song.id === currentSong.id
    );
    if (currentIndex < favouriteSongs.length - 1) {
      await handleClick(currentIndex + 1);
    } else {
      console.log("No more songs left!");
    }
  };

  const handlePrevious = async () => {
    if (isLoading || !currentSong) return;

    const currentIndex = favouriteSongs.findIndex(
      (song) => song.id === currentSong.id
    );
    if (currentIndex > 0) {
      await handleClick(currentIndex - 1);
    } else {
      console.log("No more songs left!");
    }
  };

  const handlePlayPause = () => {
    if (!audioElement) return;
    if (isPlaying) {
      audioElement.pause();
      dispatch(pauseAudio());
    } else {
      audioElement.play();
      dispatch(playAudio({ songUrl: currentSong.songUrl, song: currentSong }));
    }
  };

  const handleRepeat = () => {
    setRepeat(!repeat);
  };

  useEffect(() => {
    const audio = audioElement;
    const handleEnded = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, isLoading, repeat]);

  return (
    <>

      <div className="favouriteContainer1">
        <h1 className="favouriteHeading1">
          Here The List Of Your Favourite Songs 🎵
        </h1>
      </div>
      <hr className="favouriteHr"></hr>
      <div className="favouriteContainer2">
        {favouriteSongs.length > 0 && isAuthenticated ? (
          favouriteSongs.map((song, index) => (
            <p
              key={song.id}
              onClick={() => handleClick(index)}
              style={{
                cursor: "pointer",
                color: currentSong?.id === song.id ? "green" : "white",
                fontWeight: currentSong?.id === song.id ? "bold" : "lighter",
              }}
            >
              {i++}. {song.title}{" "}
            </p>
          ))
        ) : (
          <div className="favouriteContainer2">
            <p style={{ fontWeight: "bold" }}>No favourite songs added yet.</p>
          </div>
        )}
      </div>
      <PlayerControl
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePlayPause={handlePlayPause}
        handleRepeat={handleRepeat}
      />
    </>
  );
};

export default Favourite;
