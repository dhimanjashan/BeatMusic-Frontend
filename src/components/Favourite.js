import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import PlayerControl from "./PlayerControl";
import { playAudio, pauseAudio } from "../state/audioSlice";
import { fetchFavorites, setFavorites } from "../state/favouriteSlice";

const Favourite = ({ isNavOpen }) => {
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
      dispatch(fetchFavorites(userID));
    }
  }, [dispatch, userID]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleClick = async (songIndex) => {
    if (isLoading) return;
    setIsLoading(true);

    const song = favouriteSongs[songIndex];
    const API_URL = "http://localhost:5000";
    try {
      const response = await fetch(`${API_URL}/api/songs/${song.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const songUrl = response.url;

      if (audioElement) {
        audioElement.src = songUrl;
        audioElement.load();

        audioElement.oncanplaythrough = () => {
          audioElement
            .play()
            .then(() => {
              dispatch(playAudio({ songUrl, song }));
            })
            .catch((error) => {
              console.error("Error playing audio:", error);
            });
        };
      }
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
  const handleLogout = () => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    setTimeout(() => {
      dispatch(pauseAudio());
    }, 100);
  };

  const handleFavouriteDelete = async (songIndex) => {
    if (isLoading) return;
    setIsLoading(true);
    const song = favouriteSongs[songIndex];
    const updatedFavorites = favouriteSongs.filter((fav) => fav.id !== song.id);
    dispatch(setFavorites(updatedFavorites));
    try {
      const response = await fetch(
        "http://172.20.10.4:5000/api/favSongs/removeSong/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userID, songId: song.id }),
        }
      );
      if (response.ok) {
        if (currentSong && currentSong.id === song.id) {
          if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
          }
          setTimeout(() => {
            dispatch(pauseAudio());
          }, 100);
        }
      }
      if (!response.ok) {
        dispatch(setFavorites(favouriteSongs));
        throw new Error("Failed to delete song");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={
          isNavOpen
            ? "favouriteContainer1 blur-background"
            : "favouriteContainer1"
        }
      >
        <h1 className="favouriteHeading1">
          Enjoy Your All-Time Favorite Hits ❤️
        </h1>
      </div>
      <hr className="favouriteHr"></hr>
      <div
        className={
          isNavOpen
            ? "favouriteContainer2 blur-background"
            : "favouriteContainer2"
        }
      >
        {favouriteSongs.length > 0 && isAuthenticated ? (
          favouriteSongs.map((song, index) => (
            <div>
              <p
                key={song.id}
                onClick={() => handleClick(index)}
                style={{
                  cursor: "pointer",
                  color: currentSong?.id === song.id ? "#030710" : "white",
                  fontWeight: currentSong?.id === song.id ? "bold" : "lighter",
                }}
              >
                {i++}. {song.title}{" "}
              </p>
              <div className="favouriteDelContainer">
                <i
                  className="fas fa-trash favouriteDelete"
                  onClick={() => handleFavouriteDelete(index)}
                ></i>
              </div>
            </div>
          ))
        ) : (
          <div className="favouriteContainer2">
            <p style={{ fontWeight: "bold" }}>No favourite songs added yet.</p>
          </div>
        )}
        <PlayerControl
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handlePlayPause={handlePlayPause}
          handleRepeat={handleRepeat}
        />
      </div>
    </>
  );
};

export default Favourite;
