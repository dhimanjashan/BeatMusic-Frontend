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
      id: "Dildarian_-_Amrinder_Gill_qkzja4",
      title: "Dildarian song by Amrinder Gill",
    },
    {
      id: "Ki_Samjhaiye_-_Amrinder_Gill_amvhkf",
      title: "Ki Samjhaiye song by Amrinder Gill",
    },
    {
      id: "Yaarian_-_-_Amrinder_Gill_swpfih",
      title: "Yarrian song by Amrinder Gill",
    },
    {
      id: "Judaa_3_Title_Track_-_Amrinder_Gill_ncstcr",
      title: "Judaa song by Amrinder Gill",
    },
    { id: "Bapu_-_Amrinder_Gill_i6435b", title: "Baapu song by Amrinder Gill" },
    {
      id: "Dubda_Sooraj_-_Amrinder_Gill_qwxkpo",
      title: "Dubda Sooraj song by Amrinder Gill",
    },
    {
      id: "Kurta_-_Amrinder_Gill_vdb4is",
      title: "Kurta Suha - Angrej song by Amrinder Gill",
    },
    {
      id: "Supna_-_Amrinder_Gill_j1rp1t",
      title: "Supna song by Amrinder Gill",
    },
    {
      id: "That_Girl_-_Amrinder_Gill_mhkphf",
      title: "That Girl song by Amrinder Gill",
    },
    {
      id: "Heerey_-_Amrinder_Gill_tiictn",
      title: "Heerey - Love Punjab song by Amrinder Gill",
    },
    {
      id: "Chal_Jindiye_-_Amrinder_Gill_gehvee",
      title: "Chal Jindiye song by Amrinder Gill",
    },
    {
      id: "Ocean_Eyes_-_Amrinder_Gill_x0ajoo",
      title: "Ocean Eyes song by Amrinder Gill",
    },
  ];
  const API_URL = process.env.REACT_APP_API_URL || "";

  const handleClick = async (songIndex) => {
    if (isLoading) return;
    setIsLoading(true);

    const song = songs[songIndex];
    const API_URL = "http://172.20.10.4:5000";
    try {
      const response = await fetch(`${API_URL}/api/songs/${song.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const songUrl = data.file_path;
      console.log("Fetched Song URL:", songUrl);

      if (!songUrl) {
        console.error("Invalid file path received:", songUrl);
        return;
      }

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
