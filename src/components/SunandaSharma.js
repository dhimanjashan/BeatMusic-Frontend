import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "../state/audioSlice";
import PlayerControl from "./PlayerControl";
import { addFavorite } from "../state/favouriteSlice";
import { useNavigate } from "react-router-dom";

const SunandaSharma = ({ isNavOpen }) => {
  const audioRef = useRef(null);
  const [repeat, setRepeat] = useState(false);
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
      id: "679363ec47bdbe218604421d",
      title: "Jatt Disda mp3 song by Sunanda Sharma.",
    },
    {
      id: "6793671a47bdbe218604423c",
      title: "Udh Di Phiran mp3 song by Sunanda Sharma.",
    },
    {
      id: "6793674547bdbe218604423e",
      title: "Billi Akh mp3 song by Sunanda Sharma.",
    },
    {
      id: "6793645a47bdbe218604421f",
      title: "Patake mp3 song by Sunanda Sharma.",
    },
    {
      id: "679364c947bdbe2186044221",
      title: "Jatt Yamla mp3 song by Sunanda Sharma.",
    },
    {
      id: "6793653a47bdbe2186044225",
      title: "Jaani Tera Naa mp3 song by Sunanda Sharma.",
    },
    {
      id: "6793656d47bdbe2186044227",
      title: "Koke mp3 song by Sunanda Sharma.",
    },
    {
      id: "6793659047bdbe2186044229",
      title: "Morni mp3 song by Sunanda Sharma.",
    },
    {
      id: "679365b147bdbe218604422b",
      title: "Sandal mp3 song by Sunanda Sharma.",
    },
    {
      id: "679365d147bdbe218604422d",
      title: "Ban mp3 song by Sunanda Sharma.",
    },
    {
      id: "679365fe47bdbe218604422f",
      title: "Nanki Da Veer mp3 song by Sunanda Sharma.",
    },
    {
      id: "6793662d47bdbe2186044231",
      title: "Duji Vaar Pyar mp3 song by Sunanda Sharma.",
    },
    {
      id: "6793665a47bdbe2186044233",
      title: "Pagal Nahi Hona mp3 song by Sunanda Sharma.",
    },
    {
      id: "679366a347bdbe2186044236",
      title: "Chorri Chorri mp3 song by Sunanda Sharma.",
    },
    {
      id: "679366c947bdbe2186044238",
      title: "Saadi Yaad mp3 song by Sunanda Sharma.",
    },
    {
      id: "679366f447bdbe218604423a",
      title: "9-9 Mashukan mp3 song by Sunanda Sharma.",
    },
    {
      id: "679367b347bdbe2186044242",
      title:
        "Parlour Te mp3 song by Sunanda Sharma in album Mittran Da Challeya Truck Ni.",
    },
    {
      id: "6793678447bdbe2186044240",
      title:
        "Lipstick Bindiyan mp3 song by Sunanda Sharma in album Mittran Da Challeya Truck Ni.",
    },
  ];

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
    </>
  );
};

export default SunandaSharma;
