import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "../state/audioSlice";
import PlayerControl from "./PlayerControl";
import { addFavorite } from "../state/favouriteSlice";
import { useNavigate } from "react-router-dom";

const NimratSongs = ({ isNavOpen }) => {
  console.log(isNavOpen);
  const [repeat, setRepeat] = useState(false);
  const audioRef = useRef(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isPlaying, currentSong, audioElement } = useSelector(
    (state) => state.audio
  );
  const userID = useSelector((state) => state.user.userID);
  const favouriteSongs = useSelector((state) => state.favourite.songs) || [];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const songs = [
    {
      id: "6791f5d2bcb2c977364113ba",
      title: "Sohne Sohne Suit mp3 song by Nimrat Khaira.",
    },
    {
      id: "67931e76f7a1211383f70d37",
      title: "Suit mp3 song by Nimrat Khaira featuring Mankirt Aulakh.",
    },
    {
      id: "6793349547bdbe21860441f0",
      title: "Ranihaar mp3 song by Nimrat Khaira.",
    },
    {
      id: "679334c947bdbe21860441f3",
      title: "Designer mp3 song by Nimrat Khaira.",
    },
    {
      id: "679334f247bdbe21860441f5",
      title: "Lehnga mp3 song by Nimrat Khaira.",
    },
    {
      id: "6793350b47bdbe21860441f7",
      title: "Ishq Kacheri mp3 song by Nimrat Khaira.",
    },
    {
      id: "6793352647bdbe21860441f9",
      title: "Time Chakda mp3 song by Nimrat Khaira.",
    },
    {
      id: "6793354647bdbe21860441fc",
      title: "SP De Rank Wargi mp3 song by Nimrat Khaira.",
    },
    {
      id: "67a711c131755642e981aaa3",
      title: "Gall Mukk Gyi mp3 song by Nimrat Khaira",
    },
    {
      id: "6793357147bdbe21860441fe",
      title: "Salute Vajde mp3 song by Nimrat Khaira.",
    },
    {
      id: "6793358c47bdbe2186044200",
      title: "Rohab Rakhdi mp3 song by Nimrat Khaira.",
    },
    {
      id: "679335a747bdbe2186044202",
      title: "Sira E Hou mp3 song by Nimrat Khaira featuring Amrit Maan.",
    },
  ];

  const handleClick = async (songIndex) => {
    console.log("Here");
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

      // if (!data.file_path || typeof data.file_path !== "string") {
      //   console.error("Invalid file path received:", data.file_path);
      //   return;
      // }

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

    if (isPlaying) {
      audioElement.pause();
      dispatch(pauseAudio());
    } else {
      audioElement.play();
      dispatch(playAudio({ songUrl: currentSong.songUrl, song: currentSong }));
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

      const response = await fetch("http://172.20.10.4:5000/api/favSongs/add", {
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
    if (!audioRef.current) return;

    const handleEnded = () => {
      if (repeat) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        handleNext();
      }
    };

    audioRef.current.addEventListener("ended", handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded);
      }
    };
  }, [currentSong, isLoading, repeat, audioRef.current]);

  return (
    <>
      <div
        className={
          isNavOpen ? "musicContainer1 blur-background" : "musicContainer1"
        }
      >
        <div
          className={
            isNavOpen
              ? "specialmusicContainer2 blur-background"
              : "specialmusicContainer2"
          }
        >
          {songs.map((song, index) => (
            <p
              key={song.id}
              onClick={() => handleClick(index)}
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
        <audio ref={audioRef} />
        <PlayerControl
          audio={audioRef.current}
          handleNext={handleNext}
          handlePlayPause={handlePlayPause}
          isPlaying={isPlaying}
          handlePrevious={handlePrevious}
          handleFavourite={handleFavourite}
          handleRepeat={handleRepeat}
        />
      </div>
    </>
  );
};

export default NimratSongs;
