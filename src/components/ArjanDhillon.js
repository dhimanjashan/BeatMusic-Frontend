import React, { useState, useEffect } from "react";
import PlayerControl from "./PlayerControl";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "../state/audioSlice";
import { addFavorite } from "../state/favouriteSlice";
import { useNavigate } from "react-router-dom";

const ArjanDhillon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(false);
  const { isPlaying, currentSong, audioElement } = useSelector(
    (state) => state.audio
  );
  const userID = useSelector((state) => state.user.userID);
  const favouriteSongs = useSelector((state) => state.favourite.songs) || [];
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const songs = [
    {
      id: "67936f1e47bdbe2186044244",
      title: "Gutt mp3 song by Arjan Dhillon.",
    },
    {
      id: "679371b947bdbe2186044246",
      title: "Tu Jdo Auna mp3 song by Arjan Dhillon.",
    },
    {
      id: "6793721d47bdbe2186044248",
      title: "2-2 Asle mp3 song by Arjan Dhillon.",
    },
    {
      id: "679372a347bdbe218604424a",
      title: "Vatt Da Raula mp3 song by Arjan Dhillon.",
    },
    {
      id: "679372ea47bdbe218604424c",
      title: "Sher-E-Panjab mp3 song by Arjan Dhillon.",
    },
    {
      id: "6793738147bdbe218604424e",
      title: "Jawani mp3 song by Arjan Dhillon.",
    },
    {
      id: "679373ce47bdbe2186044250",
      title: "Zigana mp3 song by Arjan Dhillon.",
    },
    {
      id: "6793740047bdbe2186044252",
      title: "Parallel Thoughts mp3 song by Arjan Dhillon.",
    },
    {
      id: "6793742e47bdbe2186044254",
      title: "Panjabi mp3 song by Arjan Dhillon.",
    },
    {
      id: "6793745c47bdbe2186044256",
      title: "Brats mp3 song by Arjan Dhillon.",
    },
    {
      id: "679374a947bdbe2186044258",
      title: "Jeona mp3 song by Arjan Dhillon.",
    },
    {
      id: "679374d047bdbe218604425a",
      title: "Rabb mp3 song by Arjan Dhillon.",
    },
    {
      id: "679374f547bdbe218604425c",
      title: "More Beautiful mp3 song by Arjan Dhillon.",
    },
    {
      id: "6793751f47bdbe218604425e",
      title: "Hommie Call mp3 song by Arjan Dhillon.",
    },
    {
      id: "6793753f47bdbe2186044260",
      title: "Hold On mp3 song by Arjan Dhillon.",
    },
    {
      id: "6793762047bdbe2186044262",
      title: "Dunia mp3 song by Arjan Dhillon.",
    },
    {
      id: "6793764547bdbe2186044264",
      title: "Bai Bai mp3 song by Arjan Dhillon.",
    },
    {
      id: "6793766a47bdbe2186044266",
      title: "25-25 mp3 song by Arjan Dhillon.",
    },
    {
      id: "6793768947bdbe2186044268",
      title: "Calculations mp3 song by Arjan Dhillon.",
    },
    {
      id: "679376c047bdbe218604426a",
      title: "Opinion mp3 song by Arjan Dhillon.",
    },
  ];

  const handleClick = async (songIndex) => {
    if (isLoading) return;
    setIsLoading(true);

    const song = songs[songIndex];

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
      <div className="allcontainerColor">


        <div className="musicContainer1">
          <div className="specialmusicContainer3">
            {songs.map((song, index) => (
              <p
                key={song.id}
                onClick={() => handleClick(index)}
                style={{
                  cursor: "pointer",
                  color: currentSong?.id === song.id ? "green" : "white",
                  fontWeight: currentSong?.id === song.id ? "bold" : "lighter",
                }}
              >
                {song.title}
              </p>
            ))}
          </div>
        </div>
        <PlayerControl
          audio={audioElement}
          handleNext={handleNext}
          handlePlayPause={handlePlayPause}
          isPlaying={isPlaying}
          handlePrevious={handlePrevious}
          handleRepeat={handleRepeat}
          handleFavourite={handleFavourite}
        />
      </div>
    </>
  );
};

export default ArjanDhillon;
