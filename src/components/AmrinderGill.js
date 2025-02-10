import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerControl from "./PlayerControl";
import { playAudio, pauseAudio } from "../state/audioSlice";

const AmrinderGill = () => {
  const dispatch = useDispatch();
  const { isPlaying, currentSong, audioElement } = useSelector(
    (state) => state.audio
  );
  const [isLoading, setIsLoading] = useState(false);

  const songs = [
    { id: "679355ef47bdbe2186044204", title: "Dildarian - Judaa" },
    { id: "679358cf47bdbe2186044206", title: "Ki Samjhaiye - Judaa" },
    { id: "6793590947bdbe2186044208", title: "Yarrian - Judaa" },
    { id: "6793599347bdbe218604420a", title: "Judaa - Judaa" },
    { id: "679359d247bdbe218604420c", title: "Baapu" },
    { id: "67935b8447bdbe2186044218", title: "Dubda Sooraj" },
    { id: "67935a0347bdbe218604420e", title: "Kurta Suha - Angrej" },
    { id: "67935a5847bdbe2186044210", title: "Supna" },
    { id: "67935be147bdbe218604421a", title: "That Girl" },
    { id: "67935a7f47bdbe2186044212", title: "Heerey - Love Punjab" },
    {
      id: "67935acb47bdbe2186044214",
      title: "Chal Jindiye - Judaa 3 Chapter One",
    },
    { id: "67935b2647bdbe2186044216", title: "Ocean Eyes" },
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

      if (audioElement) {
        audioElement.src = data.file_path;
        audioElement.load();
        audioElement.oncanplaythrough = () => {
          audioElement.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
          dispatch(playAudio({ songUrl: data.file_path, song }));
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
    } else if (currentSong) {
      audioElement.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
      dispatch(playAudio({ songUrl: currentSong.songUrl, song: currentSong }));
    }
  };

  useEffect(() => {
    const audio = audioElement;
    const handleEnded = () => {
      handleNext();
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, isLoading]);

  return (
    <>
      <div className="musicContainer1">
        {songs.map((song, index) => (
          <p
            key={song.id}
            onClick={() => handleClick(index)}
            style={{
              cursor: "pointer",
              color: currentSong?.id === song.id ? "crimson" : "white",
              fontWeight: currentSong?.id === song.id ? "bold" : "normal",
            }}
          >
            {song.title} by Amrinder Gill
          </p>
        ))}
      </div>

      <PlayerControl
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handlePlayPause={handlePlayPause}
      />
    </>
  );
};

export default AmrinderGill;
