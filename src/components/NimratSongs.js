import React from "react";
import { useState, useRef, useEffect } from "react";
import PlayerControl from "./PlayerControl";

const NimratSongs = () => {
  const [data, setData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [isLoading, setisLoading] = useState(false);
  const [currentSong, setcurrentSong] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const songs = [
    {
      id: "6791f5d2bcb2c977364113ba",
      title: "Sohne Sohne Suit mp3 song Nimrat Khaira in album Nimmo.",
    },
    {
      id: "67931e76f7a1211383f70d37",
      title:
        "Suit mp3 song Nimrat Khaira featuring Mankirt Aulakh in album Nimmo.",
    },
    {
      id: "6793349547bdbe21860441f0",
      title: "Ranihaar mp3 song Nimrat Khaira in album Nimmo.",
    },
    {
      id: "679334c947bdbe21860441f3",
      title: "Designer mp3 song Nimrat Khaira in album Nimmo.",
    },
    {
      id: "679334f247bdbe21860441f5",
      title: "Lehnga mp3 song Nimrat Khaira in album Nimmo.",
    },
    {
      id: "6793350b47bdbe21860441f7",
      title: "Ishq Kacheri mp3 song Nimrat Khaira in album Nimmo.",
    },
    {
      id: "6793352647bdbe21860441f9",
      title: "Time Chakda mp3 song Nimrat Khaira in album Nimmo.",
    },
    {
      id: "6793354647bdbe21860441fc",
      title: "SP De Rank Wargi mp3 song Nimrat Khaira in album Nimmo.",
    },
    { id: "67a711c131755642e981aaa3", title: "59. Gall Mukk Gyi mp3 song by Nimrat Khaira" },
    {
      id: "6793357147bdbe21860441fe",
      title: "Salute Vajde mp3 song Nimrat Khaira in album Nimmo.",
    },
    {
      id: "6793358c47bdbe2186044200",
      title: "Rohab Rakhdi mp3 song Nimrat Khaira in album Nimmo.",
    },
    {
      id: "679335a747bdbe2186044202",
      title:
        "Sira E Hou mp3 song Nimrat Khaira featuring Amrit Maan in album Nimmo.",
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
      setData(data);
      console.log(data);

      if (audioRef.current) {
        audioRef.current.src = data.file_path;
        audioRef.current.load();
        setcurrentSong(song);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    } finally {
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

export default NimratSongs;
