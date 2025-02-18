import React, { useRef, useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { actionCreator } from "../state";
import PlayerControl from "./PlayerControl";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "../state/audioSlice";
import { addFavourite, removeFavourite } from "../state/favouriteSlice";

const ArjanDhillon = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const { play } = bindActionCreators(actionCreator, dispatch);
  const [isLoading, setIsLoading] = useState(false);
  const { isPlaying, currentSong, audioElement } = useSelector(
    (state) => state.audio
  );
  const favouriteSongs = useSelector((state) => state.favourite.favouriteSongs);
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
      const response = await fetch("http://localhost:5000/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songId: song.id }),
      });
      const data = await response.json();

      if (!data.file_path || typeof data.file_path !== "string") {
        console.error("Invalid file path received:", data.file_path);
        return;
      }

      if (audioElement) {
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

  const handleFavourite = () => {
    if (!currentSong) return;
    const isFavourite = favouriteSongs.some((fav) => fav.id === currentSong.id);

    if (isFavourite) {
      dispatch(removeFavourite(currentSong.id));
    } else {
      dispatch(addFavourite(currentSong));
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
      <div className="musicContainer1">
        <div className="specialmusicContainer2">
          {songs.map((song, index) => (
            <p
              key={song.id}
              onClick={() => handleClick(index)}
              style={{
                cursor: "pointer",
                color: currentSong?.id === song.id ? "white" : "black",
                fontWeight: currentSong?.id === song.id ? "bolder" : "bold",
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
        handleRepeat={handleRepeat}
        handleFavourite={handleFavourite}
      />
    </>
  );
};

export default ArjanDhillon;
