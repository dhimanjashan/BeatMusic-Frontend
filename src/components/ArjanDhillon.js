import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreator } from "../state";
import PlayerControl from "./PlayerControl";

const ArjanDhillon = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const { play } = bindActionCreators(actionCreator, dispatch);
  const [isLoading, setisLoading] = useState(false);
  const [currentSong, setcurrentSong] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const songs = [
    {
      id: "67936f1e47bdbe2186044244",
      title: "Gutt mp3 song by Arjan Dhillon in album Gutt.",
    },
    {
      id: "679371b947bdbe2186044246",
      title: "Tu Jdo Auna mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "6793721d47bdbe2186044248",
      title: "2-2 Asle mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "679372a347bdbe218604424a",
      title: "Vatt Da Raula mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "679372ea47bdbe218604424c",
      title: "Sher-E-Panjab mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "6793738147bdbe218604424e",
      title: "Jawani mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "679373ce47bdbe2186044250",
      title: "Zigana mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "6793740047bdbe2186044252",
      title: "Parallel Thoughts mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "6793742e47bdbe2186044254",
      title: "Panjabi mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "6793745c47bdbe2186044256",
      title: "Brats mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "679374a947bdbe2186044258",
      title: "Jeona mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "679374d047bdbe218604425a",
      title: "Rabb mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "679374f547bdbe218604425c",
      title: "More Beautiful mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "6793751f47bdbe218604425e",
      title: "Hommie Call mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "6793753f47bdbe2186044260",
      title: "Hold On mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "6793762047bdbe2186044262",
      title: "Dunia mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "6793764547bdbe2186044264",
      title: "Bai Bai mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "6793766a47bdbe2186044266",
      title: "25-25 mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "6793768947bdbe2186044268",
      title: "Calculations mp3 song by Arjan Dhillon in album Patander.",
    },
    {
      id: "679376c047bdbe218604426a",
      title: "Opinion mp3 song by Arjan Dhillon in album Patander.",
    },
  ];

  const handleClick = async (songIndex) => {
    if (isLoading) return;
    setisLoading(true);
    const song = songs[songIndex];
    try {
      const response = await fetch("http://localhost:5000/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songId: song.id }),
      });
      const data = await response.json();
      if (audioRef.current) {
        audioRef.current.src = data.file_path;
        audioRef.current.load();
        setcurrentSong(song);
        await audioRef.current.play(true);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    }finally {
      setisLoading(false);
    }
  };
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (isLoading || !currentSong) return;
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex < songs.length - 1) {
      handleClick(currentIndex + 1);
    } else {
      console.log("No more songs left!");
    }
  };

  const handlePrevious = async () => {
    if (isLoading || !currentSong) return;

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex < songs.length - 1) {
      await handleClick(currentIndex - 1);
    } else {
      console.log("No more songs left!");
    }
  };
  useEffect(()=>{
    const audio=audioRef.current;
    const handleEnded=()=>{
      handleNext();
    }
    audio.addEventListener("ended",handleEnded);
    return ()=>{
      audio.removeEventListener("ended",handleEnded);
    }
  },[currentSong,isLoading]);

  return (
    <>
      <div  className="musicContainer1">
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
      />
    </>
  );
};

export default ArjanDhillon;
