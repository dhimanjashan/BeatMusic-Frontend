import React, { useEffect, useState, useRef } from "react";
import PlayerSystem from "./PlayerSystem";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "../state/audioSlice";
import { addFavorite } from "../state/favouriteSlice";
import PlayerControl from "./PlayerControl";
import { useNavigate } from "react-router-dom";

const Newmusic = () => {
  const audioRef = useRef(null);
  const [repeat, setRepeat] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isPlaying, currentSong, audioElement } = useSelector(
    (state) => state.audio
  );
  const userID = useSelector((state) => state.user.userID);
  const favouriteSongs = useSelector((state) => state.favourite.songs) || [];
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newPunjabiSongs = [
    {
      id: "679367b347bdbe2186044242",
      title: "Parlour Te mp3 song by Sunanda Sharma.",
    },
    {
      id: "6793678447bdbe2186044240",
      title: "Lipstick Bindiyan mp3 song by Sunanda Sharma.",
    },
    {
      id: "67d28db63147114aa1df0228",
      title: "Fomo mp3 song by Jordan Sandhu.",
    },
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
      id: "67a464155886b255ee475737",
      title: "Mehfil mp3 song by Gulab Sidhu in album Mehfil.",
    },
    { id: "67a6d5f1ea4bf472388d60d3", title: "Bapu Zimidar - Jassi Gill." },
    {
      id: "67a6d728ea4bf472388d60d5",
      title: "Yes No mp3 song by Gulab Sidhu.",
    },
    { id: "67a6d853ea4bf472388d60d9", title: "Got You song by G Khan." },
    {
      id: "67a6d8c7ea4bf472388d60db",
      title: "Nattiyaan song by Shipra Goyal.",
    },
    {
      id: "67a6d9ddea4bf472388d60df",
      title: "La La La Hoi Pai Aa song by Hunar Sidhu.",
    },
    {
      id: "6793352647bdbe21860441f9",
      title: "Time Chakda mp3 song by Nimrat Khaira.",
    },
    {
      id: "6793354647bdbe21860441fc",
      title: "SP De Rank Wargi mp3 song by Nimrat Khaira.",
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
      id: "67a6e85bea4bf472388d60ef",
      title: "Andaaze song by Khan Bhaini.",
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
      id: "6793358c47bdbe2186044200",
      title: "Rohab Rakhdi mp3 song by Nimrat Khaira.",
    },
    {
      id: "679335a747bdbe2186044202",
      title: "Sira E Hou mp3 song by Nimrat Khaira featuring Amrit Maan.",
    },
    {
      id: "679355ef47bdbe2186044204",
      title: "Dildarian song by Amrinder Gill",
    },
    {
      id: "67935b2647bdbe2186044216",
      title: "Ocean Eyes song by Amrinder Gill",
    },
    {
      id: "67937eff47bdbe2186044270",
      title: "Chann Chann Da mp3 song by Jordan Sandhu.",
    },
    {
      id: "67937f2347bdbe2186044272",
      title: "Pre Workout mp3 song by Jordan Sandhu.",
    },
    {
      id: "67937f9b47bdbe2186044276",
      title: "Do Vaari Jatt mp3 song by Jordan Sandhu.",
    },
    {
      id: "67937fcf47bdbe2186044278",
      title: "Teeje Week mp3 song by Jordan Sandhu in album Teeje Week.",
    },
    {
      id: "679380e547bdbe2186044282",
      title: "Tu Te Sharab mp3 song by Jordan Sandhu in album Tu Te Sharab.",
    },
    {
      id: "67a6ecacea4bf472388d60f9",
      title: "Aaye Haaye song by Karan Aujla.",
    },
    {
      id: "67a7096731755642e981aa89",
      title: "Hass Hass song by Diljit Dosanjh.",
    },
  ];

  const handleClick = async (songIndex) => {
    if (isLoading) return;
    setIsLoading(true);

    const song = newPunjabiSongs[songIndex];
    const API_URL = "http://localhost:5000";
    try {
      const response = await fetch(`${API_URL}/api/songs/${song.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const songUrl = response.url;

      if (audioElement) {
        audioElement.src = songUrl;
        audioElement.load();

        audioElement.oncanplaythrough = () => {
          audioElement
            .play()
            .then(() => {
              dispatch(playAudio({ songUrl, song }));
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
      const isFavourite = favouriteSongs.some(
        (fav) => fav.id === currentSong.id
      );

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
          title: currentSong.title,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Song added to favorites:", data);
        // Add the song to Redux store
        dispatch(
          addFavorite({
            id: currentSong.id,
            title: currentSong.title,
          })
        );
      } else {
        console.error("Failed to add favorite:", data.message);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
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
          Dance & Celebrate with These Wedding Hits 😊🎵
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
                color: currentSong?.id === song.id ? "#030710" : "white",
                fontWeight: currentSong?.id === song.id ? "bold" : "lighter",
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
