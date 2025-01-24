import React, { useRef, useState } from "react";

const ArjanDhillon = () => {
  const [data, setdata] = useState("");
  const audioRef = useRef(null);
  const [isPlaying, setisPlaying] = useState(false);
  const handleClick = async (songId) => {
    const response = await fetch("http://localhost:5000/songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ songId }),
    });
    const data = await response.json();

    if (data._id === songId) {
      if (audioRef.current) {
        audioRef.current.src = data.file_path;
        if (!isPlaying) {
          audioRef.current.play(true);
          setisPlaying(true);
        } else {
          audioRef.current.pause(false);
          setisPlaying(false);
        }
      }
    }
  };

  return (
    <>
      <div>
        <p
          onClick={() => {
            handleClick("67936f1e47bdbe2186044244");
          }}
        >
          Gutt mp3 song by Arjan Dhillon in album Gutt.
        </p>
        <p
          onClick={() => {
            handleClick("679371b947bdbe2186044246");
          }}
        >
          Tu Jdo Auna mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("6793721d47bdbe2186044248");
          }}
        >
          2-2 Asle mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("679372a347bdbe218604424a");
          }}
        >
          Vatt Da Raula mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("679372ea47bdbe218604424c");
          }}
        >
          Sher-E-Panjab mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("6793738147bdbe218604424e");
          }}
        >
          Jawani mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("679373ce47bdbe2186044250");
          }}
        >
          Zigana mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("6793740047bdbe2186044252");
          }}
        >
          Parallel Thoughts mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("6793742e47bdbe2186044254");
          }}
        >
          Panjabi mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("6793745c47bdbe2186044256");
          }}
        >
          Brats mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("679374a947bdbe2186044258");
          }}
        >
          Jeona mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("679374d047bdbe218604425a");
          }}
        >
          Rabb mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("679374f547bdbe218604425c");
          }}
        >
          More Beautiful mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("6793751f47bdbe218604425e");
          }}
        >
          Hommie Call mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("6793753f47bdbe2186044260");
          }}
        >
          Hold On mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("6793762047bdbe2186044262");
          }}
        >
          Dunia mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("6793764547bdbe2186044264");
          }}
        >
          Bai Bai mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("6793766a47bdbe2186044266");
          }}
        >
          25-25 mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("6793768947bdbe2186044268");
          }}
        >
          Calculations mp3 song by Arjan Dhillon in album Patander.
        </p>
        <p
          onClick={() => {
            handleClick("679376c047bdbe218604426a");
          }}
        >
          Opinion mp3 song by Arjan Dhillon in album Patander.
        </p>
      </div>
      <audio ref={audioRef} />
    </>
  );
};

export default ArjanDhillon;
