import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerControl from "./PlayerControl";
import { playAudio, pauseAudio } from "../state/audioSlice";
import { addFavorite } from "../state/favouriteSlice";
import { useNavigate } from "react-router-dom";

const AmrinderGill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isPlaying, currentSong, audioElement } = useSelector(
    (state) => state.audio
  );

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const favouriteSongs = useSelector((state) => state.favourite.songs) || [];

  const [isLoading, setIsLoading] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const userID = useSelector((state) => state.user.userID);

  const songs = [
    {
      id: "679355ef47bdbe2186044204",
      title: "Dildarian song by Amrinder Gill",
    },
    {
      id: "679358cf47bdbe2186044206",
      title: "Ki Samjhaiye song by Amrinder Gill",
    },
    { id: "6793590947bdbe2186044208", title: "Yarrian song by Amrinder Gill" },
    { id: "6793599347bdbe218604420a", title: "Judaa song by Amrinder Gill" },
    { id: "679359d247bdbe218604420c", title: "Baapu song by Amrinder Gill" },
    {
      id: "67935b8447bdbe2186044218",
      title: "Dubda Sooraj song by Amrinder Gill",
    },
    {
      id: "67935a0347bdbe218604420e",
      title: "Kurta Suha - Angrej song by Amrinder Gill",
    },
    { id: "67935a5847bdbe2186044210", title: "Supna song by Amrinder Gill" },
    {
      id: "67935be147bdbe218604421a",
      title: "That Girl song by Amrinder Gill",
    },
    {
      id: "67935a7f47bdbe2186044212",
      title: "Heerey - Love Punjab song by Amrinder Gill",
    },
    {
      id: "67935acb47bdbe2186044214",
      title: "Chal Jindiye song by Amrinder Gill",
    },
    {
      id: "67935b2647bdbe2186044216",
      title: "Ocean Eyes song by Amrinder Gill",
    },
  ];
  const API_URL = process.env.REACT_APP_API_URL || "";

  const handleClick = async (songIndex) => {
    if (isLoading) return;
    setIsLoading(true);

    const song = songs[songIndex];
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
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex < songs.length - 1) {
      await handleClick(currentIndex + 1);
    } else {
      console.log("No more songs left!");
    }
  };

  const handlePrevious = async () => {
    if (isLoading || !currentSong) return;
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex > 0) {
      await handleClick(currentIndex - 1);
    } else {
      console.log("No more songs left!");
    }
  };

  const handlePlayPause = () => {
    if (!audioElement) return;
    try {
      if (isPlaying) {
        audioElement.pause();
        dispatch(pauseAudio());
      } else {
        audioElement.play();
        dispatch(
          playAudio({ songUrl: currentSong.songUrl, song: currentSong })
        );
      }
    } catch (error) {
      console.warn("Audio play error:", error.message);
    }
  };

  const handleFavourite = async () => {
    if (!isAuthenticated) {
      navigate("/heart");
      return;
    }

    if (!currentSong || !userID) return;

    try {
      // First check if the song is already a favorite
      const isFavourite = favouriteSongs.some(
        (fav) => fav.id === currentSong.id
      );

      if (isFavourite) {
        console.log("Song is already in favorites");
        return;
      }

      const response = await fetch(`${API_URL}/api/favSongs/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userID,
          songId: currentSong.id,
          title: currentSong.title,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Song added to favorites:", data);
        // Add the song to Redux store
        dispatch(
          addFavorite({
            id: currentSong.id,
            title: currentSong.title,
          })
        );
      } else {
        console.error("Failed to add favorite:", data.message);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const handleRepeat = () => {
    setRepeat(!repeat);
  };

  useEffect(() => {
    if (!audioElement) return;

    const handleEnded = () => {
      if (repeat) {
        audioElement.currentTime = 0;
        audioElement.play();
      } else {
        handleNext();
      }
    };

    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, isLoading, repeat, audioElement]);

  return (
    <>
      <div className="musicContainer1">
        <div className="specialmusicContainer2">
          {songs.map((song, index) => (
            <p
              key={song.id}
              onTouchStart={() => handleClick(index)}
              onPointerDown={() => handleClick(index)}
              style={{
                cursor: "pointer",
                color: currentSong?.id === song.id ? "#030710" : "white",
                fontWeight: currentSong?.id === song.id ? "bold" : "lighter",
              }}
            >
              {song.title}
            </p>
          ))}
        </div>
      </div>

      <PlayerControl
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePlayPause={handlePlayPause}
        handleFavourite={handleFavourite}
        handleRepeat={handleRepeat}
      />
    </>
  );
};

export default AmrinderGill;
