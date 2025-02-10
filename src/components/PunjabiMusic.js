import React, { useRef, useState, useEffect } from "react";
import PlayerSystem from "./PlayerSystem";
import Favourite from "./Favourite";

const songs = [
  { id: "67a6d2beea4bf472388d60d1", title: "1. 295 - Sidhu Moosewala." },
  { id: "67a6d5f1ea4bf472388d60d3", title: "2. Bapu Zimidar - Jassi Gill." },
  {
    id: "67a6d728ea4bf472388d60d5",
    title: "3. Yes No mp3 song by Gulab Sidhu.",
  },
  {
    id: "67a6d7e9ea4bf472388d60d7",
    title: "4. Defender new song by Harf Cheema.",
  },
  { id: "67a6d853ea4bf472388d60d9", title: "5. Got You song by G Khan." },
  {
    id: "67a6d8c7ea4bf472388d60db",
    title: "6. Nattiyaan song by Shipra Goyal.",
  },
  { id: "67a6d941ea4bf472388d60dd", title: "7. Pyaar Hoya song by Hustinder. " },
  {
    id: "67a6d9ddea4bf472388d60df",
    title: "8. La La La Hoi Pai Aa song by Hunar Sidhu.",
  },
  { id: "67a6da47ea4bf472388d60e1", title: "9. Filter song by Gulab Sidhu." },
  {
    id: "67a6dabfea4bf472388d60e3",
    title: "10. Tera Yaar Rakane song by Shree Brar.",
  },
  {
    id: "67a6db77ea4bf472388d60e5",
    title: "11. Khalipan song by Nirvair Pannu.",
  },
  { id: "67a6dbccea4bf472388d60e7", title: "12. Tikka song by Gulab Sidhu." },
  { id: "67a6e6a1ea4bf472388d60e9", title: "13. Roti Pani song by Jass Bajwa." },
  {
    id: "67a6e71dea4bf472388d60eb",
    title: "14. Sarpanchi song by Gulab Sidhu.",
  },
  { id: "67a6e780ea4bf472388d60ed", title: "15. Taur Tappa song by Shivjot." },
  { id: "67a6e85bea4bf472388d60ef", title: "16. Andaaze song by Khan Bhaini." },
  {
    id: "67a462eb5886b255ee47572d",
    title: "17. DONALI song by Harkirat Sangha.",
  },
  { id: "67a464155886b255ee475737", title: "18. Mehfil song by Gulab Sidhu." },
  {
    id: "67a6e943ea4bf472388d60f1",
    title: "19. Snapchat song by Surjit Bhullar.",
  },
  { id: "67a6e9eeea4bf472388d60f3", title: "20. Don't You Dare by Hustinder." },
  {
    id: "67a6eb9dea4bf472388d60f5",
    title: "21. Sohneya song by Happy Raikoti.",
  },
  { id: "67a6ec01ea4bf472388d60f7", title: "22. Lahore song by Gulab Sidhu." },
  {
    id: "67a6ecacea4bf472388d60f9",
    title: "23. Aaye Haaye song by Karan Aujla.",
  },
  {
    id: "67a6ee35ea4bf472388d60fb",
    title: "24. Tiyariyan song by Satinder Sartaaj.",
  },
  { id: "67a6eec1ea4bf472388d60fd", title: "25. Sade Jehe song by R Nait." },
  {
    id: "67a6ef13ea4bf472388d60ff",
    title: "26. Sunday song by Dilpreet Dhillon.",
  },
  { id: "67a7077231755642e981aa81", title: "27. Nazran song by Nirvair Pannu." },
  { id: "67a707ea31755642e981aa83", title: "28. Jawani song by Gulab Sidhu." },
  {
    id: "67a45e845886b255ee47570d",
    title: "29. Not Sure Mp3 song by Cheema Y.",
  },
  {
    id: "67a45b5c5886b255ee475707",
    title: "30. Tu Takkri Mp3 song by Hustinder.",
  },
  {
    id: "67a45f585886b255ee475711",
    title: "31. Rangeen Song by Gurnam Bhullar.",
  },
  {
    id: "67a7088c31755642e981aa85",
    title: "32. Blackia song by Geeta Zaildar.",
  },
  {
    id: "67a708f431755642e981aa87",
    title: "33. Gucci Gabhru song by Harkirat Sangha.",
  },
  {
    id: "67a7096731755642e981aa89",
    title: "34. Hass Hass song by Diljit Dosanjh.",
  },
  { id: "67a709b931755642e981aa8b", title: "35. Talk song by Jordan Sandhu." },
  {
    id: "679371b947bdbe2186044246",
    title: "36. Tu Jdo Auna song by Arjan Dhillon.",
  },
  { id: "67a70a5c31755642e981aa8d", title: "37. Laara song by Nirvair Pannu." },
  {
    id: "67937ffa47bdbe218604427a",
    title: "38. Mirrors song by Jordan Sandhu.",
  },
  { id: "67a70b0a31755642e981aa8f", title: "39. Veham song by Harf Cheema." },
  { id: "67a70b9531755642e981aa91", title: "40. Off Roading by Khan Bhaini." },
  {
    id: "67a70c5131755642e981aa93",
    title: "41. Vehli Janta song by Kulbir Jhinjer.",
  },
  {
    id: "67a70cc731755642e981aa95",
    title: "42. Pakhe Chalde song by Jass Bajwa.",
  },
  {
    id: "6793841247bdbe2186044298",
    title: "43. Nimm Thalle song by Jordan Sandhu.",
  },
  { id: "67a70dc931755642e981aa99", title: "44. Taj  song by Veet Baljit." },
  { id: "67a70d6131755642e981aa97", title: "45. Gol Chowk song by Hustinder." },
  { id: "67a70e1631755642e981aa9b", title: "46. Be Mine song by Shubh." },
  { id: "67a70e7e31755642e981aa9d", title: "47. Changa Changa song by R Nait." },
  {
    id: "67a70fca31755642e981aa9f",
    title: "48. Fella S Forever song by Hustinder.",
  },
  {
    id: "6793352647bdbe21860441f9",
    title: "49. Time Chakda song by Nimrat Khaira.",
  },
  {
    id: "679376c047bdbe218604426a",
    title: "50. Opinion song by Arjan Dhillon.",
  },
  {
    id: "679367b347bdbe2186044242",
    title: "51. Parlour Te song by Sunanda Sharma.",
  },
  {
    id: "6793745c47bdbe2186044256",
    title: "52. Brats song by Arjan Dhillon.",
  },
  {
    id: "67a45e325886b255ee47570b",
    title: "53. Barkat song by Ranjit Bawa.",
  },
  { id: "67a710ff31755642e981aaa1", title: "54. Cat Walk song by Hustinder." },
  {
    id: "6793751f47bdbe218604425e",
    title: "55. Hommie Call song by Arjan Dhillon.",
  },
  {
    id: "679383de47bdbe2186044296",
    title: "56. Zulfaan song by Jordan Sandhu.",
  },
  {
    id: "67a4613a5886b255ee475721",
    title: "57. WAVY song by Karan Aujla.",
  },
  {
    id: "6793740047bdbe2186044252",
    title: "58. Parallel Thoughts song by Arjan Dhillon.",
  },
  {
    id: "67a711c131755642e981aaa3",
    title: "59. Gall Mukk Gyi song by Nimrat Khaira.",
  },
  {
    id: "67a7123531755642e981aaa5",
    title: "60. Karnatak song by Harkirat Sangha.",
  },
];

const PunjabiMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favouriteSong, setFavouriteSong] = useState(null);
  const [repeat, setRepeat] = useState(false);

  const handleClick = async (songIndex) => {
    const song = songs[songIndex];
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songId: song.id }),
      });
      const data = await response.json();
      console.log(data);

      if (audioRef.current) {
        audioRef.current.src = data.file_path;
        audioRef.current.load();
        setCurrentSong(song);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    } finally {
      setIsLoading(false);
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
    setFavouriteSong(currentSong);
  };


  const handleRepeat = () => {
    setRepeat(!repeat);
  };

  useEffect(() => {
    const audio = audioRef.current;
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
  }, [currentSong, isLoading,repeat]);

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
            isPlaying={isPlaying}
            handlePlayPause={handlePlayPause}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            song={currentSong}
            onFavourite={handleFavourite}
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
      {favouriteSong && <Favourite song={favouriteSong} />}
    </>
  );
};

export default PunjabiMusic;