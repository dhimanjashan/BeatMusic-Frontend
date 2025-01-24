import React, { useRef, useState } from "react";
const AmrinderGill = () => {
  const [isPlaying, setisPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleClick = async (songId) => {
    try {
      const response = await fetch("http://localhost:5000/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({songId}),
      });
      const data = await response.json();
      if (data._id === songId) {
        if (audioRef.current) {
          audioRef.current.src = data.file_path;
          if (!isPlaying) {
            audioRef.current.play();
            setisPlaying(true);
          } else {
            audioRef.current.pause();
            setisPlaying(false);
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
          handleClick("679355ef47bdbe2186044204");
        }}
      >
        Dildarian mp3 song by Amrinder Gill in album Judaa.
      </p>
      <p onClick={() => {
          handleClick("679358cf47bdbe2186044206");
        }}>Ki Samjhaiye mp3 song by Amrinder Gill in album Judaa.</p>
      <p onClick={() => {
          handleClick("6793590947bdbe2186044208");
        }}>Yarrian mp3 song by Amrinder Gill in album Judaa.</p>
      <p onClick={() => {
          handleClick("6793599347bdbe218604420a");
        }}>Judaa mp3 song by Amrinder Gill in album Judaa.</p>
      <p onClick={() => {
          handleClick("679359d247bdbe218604420c");
        }}>Baapu mp3 song by Amrinder Gill.</p>
      <p onClick={() => {
          handleClick("67935b8447bdbe2186044218");
        }}>Dubda Sooraj mp3 song by Amrinder Gill.</p>
      <p onClick={() => {
          handleClick("67935a0347bdbe218604420e");
        }}>Kurta Suha mp3 song by Amrinder Gill in album Angrej.</p>
      <p onClick={() => {
          handleClick("67935a5847bdbe2186044210");
        }}>Supna mp3 song by Amrinder Gill.</p>
      <p onClick={() => {
          handleClick("67935be147bdbe218604421a");
        }}>That Girl mp3 song by Amrinder Gill.</p>
      <p onClick={() => {
          handleClick("67935a7f47bdbe2186044212");
        }}>Heerey mp3 song by Amrinder Gill in album Love Punjab.</p>
      <p onClick={() => {
          handleClick("67935acb47bdbe2186044214");
        }}>
        Chal Jindiye mp3 song by Amrinder Gill in album Judaa 3 Chapter One.
      </p>
      <p onClick={() => {
          handleClick("67935b2647bdbe2186044216");
        }}>Ocean Eyes mp3 song by Amrinder Gill.</p>
    </div>
      <audio ref={audioRef} />
    </>
  );
};

export default AmrinderGill;
