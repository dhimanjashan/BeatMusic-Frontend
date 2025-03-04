import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "../state/audioSlice";
import PlayerControl from "./PlayerControl";
import { addFavourite, removeFavourite } from "../state/favouriteSlice";
import { useNavigate } from "react-router-dom";

const NimratSongs = () => {
 const [repeat, setRepeat] = useState(false);
  const audioRef = useRef(null);
  const [find, setfind] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const { isPlaying, currentSong, audioElement } = useSelector(
    (state) => state.audio
  );
  const favouriteSongs = useSelector((state) => state.favourite.favouriteSongs);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const songs = [
    {
      id: "6791f5d2bcb2c977364113ba",
      title: "Sohne Sohne Suit mp3 song by Nimrat Khaira.",
    },
    {
      id: "67931e76f7a1211383f70d37",
      title: "Suit mp3 song by Nimrat Khaira featuring Mankirt Aulakh.",
    },
    {
      id: "6793349547bdbe21860441f0",
      title: "Ranihaar mp3 song by Nimrat Khaira.",
    },
    {
      id: "679334c947bdbe21860441f3",
      title: "Designer mp3 song by Nimrat Khaira.",
    },
    {
      id: "679334f247bdbe21860441f5",
      title: "Lehnga mp3 song by Nimrat Khaira.",
    },
    {
      id: "6793350b47bdbe21860441f7",
      title: "Ishq Kacheri mp3 song by Nimrat Khaira.",
    },
    {
      id: "6793352647bdbe21860441f9",
      title: "Time Chakda mp3 song by Nimrat Khaira.",
    },
    {
      id: "6793354647bdbe21860441fc",
      title: "SP De Rank Wargi mp3 song by Nimrat Khaira.",
    },
    {
      id: "67a711c131755642e981aaa3",
      title: "Gall Mukk Gyi mp3 song by Nimrat Khaira",
    },
    {
      id: "6793357147bdbe21860441fe",
      title: "Salute Vajde mp3 song by Nimrat Khaira.",
    },
    {
      id: "6793358c47bdbe2186044200",
      title: "Rohab Rakhdi mp3 song by Nimrat Khaira.",
    },
    {
      id: "679335a747bdbe2186044202",
      title: "Sira E Hou mp3 song by Nimrat Khaira featuring Amrit Maan.",
    },
  ];

  const handleClick = async (songIndex) => {
    console.log("Here");
    if (isLoading) return;
    setIsLoading(true);

    const song = songs[songIndex];
    try {
      const response = await fetch("http://172.20.10.4:5000/files/", {
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
       const isAuthenticated=find;
       if (!isAuthenticated) {
         setfind(true); // Set authentication state
         navigate("/heart"); // Redirect to login/signup
         return;
       }
         if (!currentSong) return;
         const isFavourite = favouriteSongs.some(
           (fav) => fav.id === currentSong.id
         );
   
         if (isFavourite) {
           dispatch(removeFavourite(currentSong.id));
         } else {
           dispatch(addFavourite(currentSong));
         }
     };
     useEffect(() => {
       if (find) {
         navigate("/heart"); // Redirect to auth page if not logged in
       }
     }, [find]);

 const handleRepeat = () => {
     setRepeat(!repeat);
   };
 
   useEffect(() => {
     if (!audioElement) return;
   
     const handleEnded = () => {
       if (repeat) {
         audioElement.currentTime = 0;
         audioElement.play();
       } else {
     handleNext();
       }
     };
   
     audioElement.addEventListener("ended", handleEnded);
     
     return () => {
       audioElement.removeEventListener("ended", handleEnded);
     };
   }, [currentSong, isLoading, repeat, audioElement]);

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
        handleFavourite={handleFavourite}
        handleRepeat={handleRepeat}
      />
    </>
  );
};

export default NimratSongs;
