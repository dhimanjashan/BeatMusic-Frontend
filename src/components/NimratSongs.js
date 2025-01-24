import React from "react";
import { useState, useRef } from "react";

const NimratSongs = () => {
  const [data, setData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const handleClick = async (songId) => {
    try {
      const response = await fetch("http://localhost:5000/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songId }),
      });
      const data = await response.json();
      setData(data);
      console.log(data);
      if (data._id === songId) {
        if (audioRef.current) {
          audioRef.current.src = data.file_path;
          audioRef.current.load();
          if (!isPlaying) {
            audioRef.current.play();
            setIsPlaying(true);
          } else {
            audioRef.current.pause();
            setIsPlaying(false);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    }
  };
  return (
    <>
      <div>
        <p
          onClick={() => {
            handleClick("6791f5d2bcb2c977364113ba");
          }}
        >
          Sohne Sohne Suit mp3 song Nimrat Khaira in album Nimmo.
        </p>
        <p
          onClick={() => {
            handleClick("67931e76f7a1211383f70d37");
          }}
        >
          Suit mp3 song Nimrat Khaira featuring Mankirt Aulakh in album Nimmo.
        </p>

        <p
          onClick={() => {
            handleClick("6793349547bdbe21860441f0");
          }}
        >
          Ranihaar mp3 song Nimrat Khaira in album Nimmo.
        </p>
        <p
          onClick={() => {
            handleClick("679334c947bdbe21860441f3");
          }}
        >
          Designer mp3 song Nimrat Khaira in album Nimmo.
        </p>
        <p
          onClick={() => {
            handleClick("679334f247bdbe21860441f5");
          }}
        >
          Lehnga mp3 song Nimrat Khaira in album Nimmo.
        </p>
        <p
          onClick={() => {
            handleClick("6793350b47bdbe21860441f7");
          }}
        >
          Ishq Kacheri mp3 song Nimrat Khaira in album Nimmo.
        </p>
        <p
          onClick={() => {
            handleClick("6793352647bdbe21860441f9");
          }}
        >
          Time Chakda mp3 song Nimrat Khaira in album Nimmo.
        </p>
        <p
          onClick={() => {
            handleClick("6793354647bdbe21860441fc");
          }}
        >
          SP De Rank Wargi mp3 song Nimrat Khaira in album Nimmo.
        </p>
        <p
          onClick={() => {
            handleClick("6793357147bdbe21860441fe");
          }}
        >
          Salute Vajde mp3 song Nimrat Khaira in album Nimmo.
        </p>
        <p
          onClick={() => {
            handleClick("6793358c47bdbe2186044200");
          }}
        >
          Rohab Rakhdi mp3 song Nimrat Khaira in album Nimmo.
        </p>
        <p
          onClick={() => {
            handleClick("679335a747bdbe2186044202");
          }}
        >
          Sira E Hou mp3 song Nimrat Khaira featuring Amrit Maan in album Nimmo.
        </p>
      </div>
      <audio ref={audioRef} />
    </>
  );
};

export default NimratSongs;
