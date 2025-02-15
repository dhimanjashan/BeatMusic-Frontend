import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "../state/audioSlice";
import { addFavourite, removeFavourite } from "../state/favouriteSlice";
import PlayerSystem from "./PlayerSystem";

const PunjabiMusic = () => {
  const audioRef = useRef(null);
  const [repeat, setRepeat] = useState(false);
  const dispatch = useDispatch();
  const { isPlaying, currentSong, audioElement } = useSelector(
    (state) => state.audio
  );
  const favouriteSongs = useSelector((state) => state.favourite.favouriteSongs);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const songs = [
    { id: "67a6d2beea4bf472388d60d1", title: "295 - Sidhu Moosewala." },
    { id: "67a6d5f1ea4bf472388d60d3", title: "Bapu Zimidar - Jassi Gill." },
    {
      id: "67a6d728ea4bf472388d60d5",
      title: "Yes No mp3 song by Gulab Sidhu.",
    },
    {
      id: "67a6d7e9ea4bf472388d60d7",
      title: "Defender new song by Harf Cheema.",
    },
    { id: "67a6d853ea4bf472388d60d9", title: "Got You song by G Khan." },
    {
      id: "67a6d8c7ea4bf472388d60db",
      title: "Nattiyaan song by Shipra Goyal.",
    },
    {
      id: "67a6d941ea4bf472388d60dd",
      title: "Pyaar Hoya song by Hustinder. ",
    },
    {
      id: "67a6d9ddea4bf472388d60df",
      title: "La La La Hoi Pai Aa song by Hunar Sidhu.",
    },
    { id: "67a6da47ea4bf472388d60e1", title: "Filter song by Gulab Sidhu." },
    {
      id: "67a6dabfea4bf472388d60e3",
      title: " Tera Yaar Rakane song by Shree Brar.",
    },
    {
      id: "67a6db77ea4bf472388d60e5",
      title: "Khalipan song by Nirvair Pannu.",
    },
    { id: "67a6dbccea4bf472388d60e7", title: "Tikka song by Gulab Sidhu." },
    {
      id: "67a6e6a1ea4bf472388d60e9",
      title: "Roti Pani song by Jass Bajwa.",
    },
    {
      id: "67a6e71dea4bf472388d60eb",
      title: "Sarpanchi song by Gulab Sidhu.",
    },
    {
      id: "67a6e780ea4bf472388d60ed",
      title: "Taur Tappa song by Shivjot.",
    },
    {
      id: "67a6e85bea4bf472388d60ef",
      title: "Andaaze song by Khan Bhaini.",
    },
    {
      id: "67a462eb5886b255ee47572d",
      title: "DONALI song by Harkirat Sangha.",
    },
    {
      id: "67a464155886b255ee475737",
      title: "Mehfil song by Gulab Sidhu.",
    },
    {
      id: "67a6e943ea4bf472388d60f1",
      title: "Snapchat song by Surjit Bhullar.",
    },
    {
      id: "67a6e9eeea4bf472388d60f3",
      title: "Don't You Dare by Hustinder.",
    },
    {
      id: "67a6eb9dea4bf472388d60f5",
      title: "Sohneya song by Happy Raikoti.",
    },
    {
      id: "67a6ec01ea4bf472388d60f7",
      title: "Lahore song by Gulab Sidhu.",
    },
    {
      id: "67a6ecacea4bf472388d60f9",
      title: "Aaye Haaye song by Karan Aujla.",
    },
    {
      id: "67a6ee35ea4bf472388d60fb",
      title: "Tiyariyan song by Satinder Sartaaj.",
    },
    { id: "67a6eec1ea4bf472388d60fd", title: " Sade Jehe song by R Nait." },
    {
      id: "67a6ef13ea4bf472388d60ff",
      title: "Sunday song by Dilpreet Dhillon.",
    },
    {
      id: "67a7077231755642e981aa81",
      title: "Nazran song by Nirvair Pannu.",
    },
    {
      id: "67a707ea31755642e981aa83",
      title: "Jawani song by Gulab Sidhu.",
    },
    {
      id: "67a45e845886b255ee47570d",
      title: "Not Sure Mp3 song by Cheema Y.",
    },
    {
      id: "67a45b5c5886b255ee475707",
      title: "Tu Takkri Mp3 song by Hustinder.",
    },
    {
      id: "67a45f585886b255ee475711",
      title: "Rangeen Song by Gurnam Bhullar.",
    },
    {
      id: "67a7088c31755642e981aa85",
      title: "Blackia song by Geeta Zaildar.",
    },
    {
      id: "67a708f431755642e981aa87",
      title: "Gucci Gabhru song by Harkirat Sangha.",
    },
    {
      id: "67a7096731755642e981aa89",
      title: "Hass Hass song by Diljit Dosanjh.",
    },
    {
      id: "67a709b931755642e981aa8b",
      title: "Talk song by Jordan Sandhu.",
    },
    {
      id: "679371b947bdbe2186044246",
      title: "Tu Jdo Auna song by Arjan Dhillon.",
    },
    {
      id: "67a70a5c31755642e981aa8d",
      title: "Laara song by Nirvair Pannu.",
    },
    {
      id: "67937ffa47bdbe218604427a",
      title: "Mirrors song by Jordan Sandhu.",
    },
    { id: "67a70b0a31755642e981aa8f", title: "Veham song by Harf Cheema." },
    {
      id: "67a70b9531755642e981aa91",
      title: "Off Roading by Khan Bhaini.",
    },
    {
      id: "67a70c5131755642e981aa93",
      title: "Vehli Janta song by Kulbir Jhinjer.",
    },
    {
      id: "67a70cc731755642e981aa95",
      title: "Pakhe Chalde song by Jass Bajwa.",
    },
    {
      id: "6793841247bdbe2186044298",
      title: "Nimm Thalle song by Jordan Sandhu.",
    },
    { id: "67a70dc931755642e981aa99", title: "Taj  song by Veet Baljit." },
    {
      id: "67a70d6131755642e981aa97",
      title: " Gol Chowk song by Hustinder.",
    },
    { id: "67a70e1631755642e981aa9b", title: "Be Mine song by Shubh." },
    {
      id: "67a70e7e31755642e981aa9d",
      title: "Changa Changa song by R Nait.",
    },
    {
      id: "67a70fca31755642e981aa9f",
      title: "Fella S Forever song by Hustinder.",
    },
    {
      id: "6793352647bdbe21860441f9",
      title: "Time Chakda song by Nimrat Khaira.",
    },
    {
      id: "679376c047bdbe218604426a",
      title: "Opinion song by Arjan Dhillon.",
    },
    {
      id: "679367b347bdbe2186044242",
      title: "Parlour Te song by Sunanda Sharma.",
    },
    {
      id: "6793745c47bdbe2186044256",
      title: "Brats song by Arjan Dhillon.",
    },
    {
      id: "67a45e325886b255ee47570b",
      title: "Barkat song by Ranjit Bawa.",
    },
    {
      id: "67a710ff31755642e981aaa1",
      title: "Cat Walk song by Hustinder.",
    },
    {
      id: "6793751f47bdbe218604425e",
      title: "Hommie Call song by Arjan Dhillon.",
    },
    {
      id: "679383de47bdbe2186044296",
      title: "Zulfaan song by Jordan Sandhu.",
    },
    {
      id: "67a4613a5886b255ee475721",
      title: "WAVY song by Karan Aujla.",
    },
    {
      id: "6793740047bdbe2186044252",
      title: "Parallel Thoughts song by Arjan Dhillon.",
    },
    {
      id: "67a711c131755642e981aaa3",
      title: "Gall Mukk Gyi song by Nimrat Khaira.",
    },
    {
      id: "67a7123531755642e981aaa5",
      title: "Karnatak song by Harkirat Sangha.",
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
      console.log("Fetched song URL:", data.file_path); // Debugging

      if (!data.file_path || typeof data.file_path !== "string") {
        console.error("Invalid file path received:", data.file_path);
        return;
      }

      if (audioElement) {
        audioElement.src = data.file_path;
        console.log("Audio elemet set to", audioElement.src);
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
  const handleNext = () => {
    if (isLoading || !currentSong) {
      return;
    }
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex < songs.length - 1) {
      handleClick(currentIndex + 1);
    } else {
      console.log("No more songs left!");
    }
  };
  const handlePrevious = () => {
    if (isLoading || !currentSong) return;

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex > 0) {
      handleClick(currentIndex - 1);
    } else {
      console.log("No more songs left!");
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
      <div className="PunjabiSongsContainer">
        <h1 className="PunjabiSongsheading">
          Hanji Sohneyo Sunlo Punjabi Songs
        </h1>
      </div>
      <hr></hr>
      <div className="punjabiSongsContainer2">
        <div className="punjabiSongsContainer3">
          <PlayerSystem
            audio={audioRef.current}
            handleNext={handleNext}
            handlePlayPause={handlePlayPause}
            handleFavourite={handleFavourite}
            handlePrevious={handlePrevious}
            handleRepeat={handleRepeat}
          />
          {songs.map((song, index) => (
            <p
              key={song.id}
              onClick={() => handleClick(index)}
              style={{
                cursor: "pointer",
                color: currentSong?.id === song.id ? "crimson" : "black",
                fontWeight: currentSong?.id === song.id ? "bold" : "",
              }}
            >
              {song.title}
            </p>
          ))}
        </div>
      </div>
      <audio ref={audioRef} />
    </>
  );
};

export default PunjabiMusic;
