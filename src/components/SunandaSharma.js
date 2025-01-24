import React, { useRef, useState } from "react";

const SunandaSharma = () => {
  const audioRef = useRef(null);
  const [isPlaying, setisPlaying] = useState(false);
  const [data, setdata] = useState("");
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
      setdata(data);

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
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    }
  };

  return (
    <div>
      <p
        onClick={() => {
          handleClick("679363ec47bdbe218604421d");
        }}
      >
        <p
          onClick={() => {
            handleClick("6793671a47bdbe218604423c");
          }}
        >
          Jatt Disda mp3 song by Sunanda Sharma.
        </p>
        <p
          onClick={() => {
            handleClick("6793674547bdbe218604423e");
          }}
        >
          Udh Di Phiran mp3 song by Sunanda Sharma.
        </p>
        Billi Akh mp3 song by Sunanda Sharma.
      </p>
      <p
        onClick={() => {
          handleClick("6793645a47bdbe218604421f");
        }}
      >
        Patake mp3 song by Sunanda Sharma.
      </p>
      <p
        onClick={() => {
          handleClick("679364c947bdbe2186044221");
        }}
      >
        Jatt Yamla mp3 song by Sunanda Sharma.
      </p>
      <p
        onClick={() => {
          handleClick("6793653a47bdbe2186044225");
        }}
      >
        Jaani Tera Naa mp3 song by Sunanda Sharma.
      </p>
      <p
        onClick={() => {
          handleClick("6793656d47bdbe2186044227");
        }}
      >
        Koke mp3 song by Sunanda Sharma.
      </p>
      <p
        onClick={() => {
          handleClick("6793659047bdbe2186044229");
        }}
      >
        Morni mp3 song by Sunanda Sharma.
      </p>
      <p
        onClick={() => {
          handleClick("679365b147bdbe218604422b");
        }}
      >
        Sandal mp3 song by Sunanda Sharma.
      </p>
      <p
        onClick={() => {
          handleClick("679365d147bdbe218604422d");
        }}
      >
        Ban mp3 song by Sunanda Sharma.
      </p>
      <p
        onClick={() => {
          handleClick("679365fe47bdbe218604422f");
        }}
      >
        Nanki Da Veer mp3 song by Sunanda Sharma.
      </p>
      <p
        onClick={() => {
          handleClick("6793662d47bdbe2186044231");
        }}
      >
        Duji Vaar Pyar mp3 song by Sunanda Sharma.
      </p>
      <p
        onClick={() => {
          handleClick("6793665a47bdbe2186044233");
        }}
      >
        Pagal Nahi Hona mp3 song by Sunanda Sharma.
      </p>
      <p
        onClick={() => {
          handleClick("679366a347bdbe2186044236");
        }}
      >
        Chorri Chorri mp3 song by Sunanda Sharma.
      </p>
      <p
        onClick={() => {
          handleClick("679366c947bdbe2186044238");
        }}
      >
        Saadi Yaad mp3 song by Sunanda Sharma.
      </p>
      <p
        onClick={() => {
          handleClick("679366f447bdbe218604423a");
        }}
      >
        9-9 Mashukan mp3 song by Sunanda Sharma.
      </p>
      <p
        onClick={() => {
          handleClick("679367b347bdbe2186044242");
        }}
      >
        Parlour Te mp3 song by Sunanda Sharma in album Mittran Da Challeya Truck
        Ni.
      </p>
      <p
        onClick={() => {
          handleClick("6793678447bdbe2186044240");
        }}
      >
        Lipstick Bindiyan mp3 song by Sunanda Sharma in album Mittran Da
        Challeya Truck Ni.
      </p>
      <audio ref={audioRef} />
    </div>
  );
};

export default SunandaSharma;
