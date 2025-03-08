import React, { useEffect, useState, useRef } from "react";
import PlayerSystem from "./PlayerSystem";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "../state/audioSlice";
import { addFavorite, removeFavorite } from "../state/favouriteSlice";
import PlayerControl from "./PlayerControl";
import { useNavigate } from "react-router-dom";
import Heart from "./Heart";

const Newmusic = () => {
  const audioRef = useRef(null);
  const [repeat, setRepeat] = useState(false);
  const [find, setfind] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isPlaying, currentSong, audioElement } = useSelector(
    (state) => state.audio
  );
  const userID = useSelector((state) => state.user.userID);
  const favouriteSongs = useSelector(state => state.favourite.songs) || [];
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newPunjabiSongs = [
    { id: "67a45a6e5886b255ee475705", title: "Bhabhi Mp3 song by Nijjar." },
    {
      id: "67a45b5c5886b255ee475707",
      title: "Tu Takkri Mp3 song by Hustinder.",
    },
    {
      id: "67a45df45886b255ee475709",
      title: "Defender MP3 Song by Harf Cheema.",
    },
    {
      id: "67a45e325886b255ee47570b",
      title: "Barkat Mp3 song by Ranjit Bawa.",
    },
    {
      id: "67a7123531755642e981aaa5",
      title: "Karnatak mp3 song by Harkirat Sangha.",
    },
    {
      id: "67a45e845886b255ee47570d",
      title: "Not Sure Mp3 song by Cheema Y.",
    },
    {
      id: "67a45eb65886b255ee47570f",
      title: "Bachke Bachke mp3 song by Karan Aujla in album Still Rollin.",
    },
    {
      id: "67a45f585886b255ee475711",
      title: "Rangeen Mp3 Song From Album Rangeen by Gurnam Bhullar.",
    },
    {
      id: "67a45f965886b255ee475713",
      title: "Lock mp3 song by Sidhu Moose Wala The Kidd in album Lock.",
    },
    {
      id: "67a45fd45886b255ee475715",
      title: "Buckle Up mp3 song by Shubh in album Buckle Up.",
    },
    {
      id: "67a460145886b255ee475717",
      title: "Main Aa Reha mp3 song by Juss MixSingh.",
    },
    {
      id: "67a4604b5886b255ee475719",
      title: "Carti mp3 song by Shubh in album Carti.",
    },
    {
      id: "67a460885886b255ee47571b",
      title: "Rumaal mp3 song by Maninder Buttar.",
    },
    {
      id: "67a460c35886b255ee47571d",
      title: "Bai Kol mp3 song by R Nait JP47 Mad Mix.",
    },
    {
      id: "67a461025886b255ee47571f",
      title: "Dheeth Jatta Mp3 song by Chandra Brar.",
    },
    {
      id: "67a4613a5886b255ee475721",
      title: "WAVY mp3 song by Karan Aujla.",
    },
    {
      id: "67a4616f5886b255ee475723",
      title: "Sit Down Son mp3 song by Navaan Sandhu Avvy Rxtro.",
    },
    {
      id: "67a4625b5886b255ee475729",
      title: "Maavan Mp3 Song by Arjan Dhillon.",
    },
    {
      id: "67a462955886b255ee47572b",
      title: "Ki Hoya mp3 song by B Praak Afsana Khan.",
    },
    {
      id: "67a462eb5886b255ee47572d",
      title: "DONALI mp3 song by Harkirat Sangha Starboy X.",
    },
    {
      id: "67a463195886b255ee47572f",
      title: "Bars mp3 song by Shubh in album Bars.",
    },
    {
      id: "67a463465886b255ee475731",
      title: "GG mp3 song by Gurinder Gill.",
    },
    {
      id: "67a463735886b255ee475733",
      title: "Moon Calling mp3 song by Gur Sidhu Neha Kakkar.",
    },
    {
      id: "67a463aa5886b255ee475735",
      title: "Tooti Boldi mp3 song by Hunar Sidhu in album Tooti Boldi.",
    },
    {
      id: "67a464155886b255ee475737",
      title: "Mehfil mp3 song by Gulab Sidhu in album Mehfil.",
    },
    {
      id: "67a464515886b255ee475739",
      title: "Zero Tolerance mp3 song by Sukh Kairon in album Zero Tolerance.",
    },
  ];

  const handleClick = async (songIndex) => {
    if (isLoading) return;
    setIsLoading(true);

    const song = newPunjabiSongs[songIndex];
    try {
      const response = await fetch("http://172.20.10.4:5000/files/", {
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
    const currentIndex = newPunjabiSongs.findIndex(
      (song) => song.id === currentSong.id
    );
    if (currentIndex < newPunjabiSongs.length - 1) {
      handleClick(currentIndex + 1);
    } else {
      console.log("No more songs left!");
    }
  };
  const handlePrevious = () => {
    if (isLoading || !currentSong) return;

    const currentIndex = newPunjabiSongs.findIndex(
      (song) => song.id === currentSong.id
    );
    if (currentIndex > 0) {
      handleClick(currentIndex - 1);
    } else {
      console.log("No more songs left!");
    }
  };
 const handleFavourite = async () => {
      if (!isAuthenticated) {
        navigate("/heart");
        return;
      }
  
      if (!currentSong || !userID) return;
  
      try {
        // First check if the song is already a favorite
        const isFavourite = favouriteSongs.some(fav => fav.id === currentSong.id);
        
        if (isFavourite) {
          console.log("Song is already in favorites");
          return;
        }
  
        const response = await fetch("http://172.20.10.4:5000/api/favSongs/add", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            userID: userID,
            songId: currentSong.id,
            title: currentSong.title 
          }),
        });
  
        const data = await response.json();
        
        if (response.ok) {
          console.log("Song added to favorites:", data);
          // Add the song to Redux store
          dispatch(addFavorite({
            id: currentSong.id,
            title: currentSong.title
          }));
        } else {
          console.error("Failed to add favorite:", data.message);
        }
      } catch (error) {
        console.error("Error updating favorites:", error);
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
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="newmusicContainer">
        <h1 className="newmusicheading">
          Hanji Sohneyo Sunlo New Punjabi Songs 🎵
        </h1>
      </div>
      <hr className="newMusicHr"></hr>
      <div className="newmusicContainer1">
        <div className="newmusicContainer2">
          {isMobile ? (
            <PlayerControl
              handleNext={handleNext}
              handlePlayPause={handlePlayPause}
              isPlaying={isPlaying}
              handlePrevious={handlePrevious}
              handleFavourite={handleFavourite}
        handleRepeat={handleRepeat}
            />
          ) : (
            <PlayerSystem
              audio={audioRef.current}
              handleNext={handleNext}
              handlePlayPause={handlePlayPause}
              handleFavourite={handleFavourite}
              handlePrevious={handlePrevious}
              handleRepeat={handleRepeat}
            />
          )}
          {newPunjabiSongs.map((song, index) => (
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
    </>
  );
};

export default Newmusic;
