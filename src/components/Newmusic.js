import React, { useEffect, useState, useRef } from "react";
import PlayerSystem from "./PlayerSystem";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "../state/audioSlice";
import { addFavorite } from "../state/favouriteSlice";
import PlayerControl from "./PlayerControl";
import { useNavigate } from "react-router-dom";

const Newmusic = ({ isNavOpen }) => {
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1100);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newPunjabiSongs = [
    {
      id: "Fomo_1_ohz3qx",
      title: "Fomo mp3 song by Jordan Sandhu.",
    },
    {
      id: "Ammi_Wargiye_Ni_-_Shree_Brar_rq59b9",
      title: "Ammi Wargiye Ni mp3 song by Shree Brar.",
    },
    {
      id: "Muchh_-_Nirvair_Pannu_wfh2ov",
      title: "Muchh mp3 song by Nirvair Pannu.",
    },
    {
      id: "Tell_Me_Honestly_-_Ammy_Virk_qhwo2e",
      title: "Tell Me Honestly mp3 song by Ammy Virk.",
    },{
      id: "Mirrors_-_Jordan_Sandhu_itmrav",
      title: "Mirrors mp3 song by Jordan Sandhu.",
    },
    { id: "Bhabhi_-_Nijjar_fujgbw", title: "Bhabhi Mp3 song by Nijjar." },
    {
      id: "Tu_Takkri_-_Hustinder_uatz0k",
      title: "Tu Takkri Mp3 song by Hustinder.",
    },
    {
      id: "Defender_DJJOhAL.Com_a6cio1",
      title: "Defender MP3 Song by Harf Cheema.",
    },
    {
      id: "Barkat_-_Ranjit_Bawa_sxfp1e",
      title: "Barkat Mp3 song by Ranjit Bawa.",
    },
    {
      id: "Karnatak_-_Harkirat_Sangha_pdtugc",
      title: "Karnatak mp3 song by Harkirat Sangha.",
    },
    {
      id: "Not_Sure_-_Cheema_Y_bmsvhm",
      title: "Not Sure Mp3 song by Cheema Y.",
    },
    {
      id: "Bachke_Bachke_Karan_Aujla_que6w0",
      title: "Bachke Bachke mp3 song by Karan Aujla in album Still Rollin.",
    },
    {
      id: "Rangeen_icvuhd",
      title: "Rangeen Mp3 Song From Album Rangeen by Gurnam Bhullar.",
    },
    {
      id: "Lock_-_Sidhu_Moose_Wala_u3d1vw",
      title: "Lock mp3 song by Sidhu Moose Wala The Kidd in album Lock.",
    },
    {
      id: "Buckle_Up_-_Shubh_e6l5ek",
      title: "Buckle Up mp3 song by Shubh in album Buckle Up.",
    },
    {
      id: "Main_Aa_Reha_-_Juss_comzc5",
      title: "Main Aa Reha mp3 song by Juss MixSingh.",
    },
    {
      id: "Carti_-_Shubh_srdi7z",
      title: "Carti mp3 song by Shubh in album Carti.",
    },
    {
      id: "Rumaal_-_Maninder_Buttar_fblcpo",
      title: "Rumaal mp3 song by Maninder Buttar.",
    },
    {
      id: "Bai_Kol_-_R_Nait_uujror",
      title: "Bai Kol mp3 song by R Nait JP47 Mad Mix.",
    },
    {
      id: "Dheeth_Jatta_-_Chandra_Brar_bdsems",
      title: "Dheeth Jatta Mp3 song by Chandra Brar.",
    },
    {
      id: "Wavy_-_Karan_Aujla_xv4izd",
      title: "WAVY mp3 song by Karan Aujla.",
    },
    {
      id: "Sit_Down_Son_-_Navaan_Sandhu_e88nul",
      title: "Sit Down Son mp3 song by Navaan Sandhu Avvy Rxtro.",
    },
    {
      id: "Maavan_Arjan_Dhillon_kqi8cb",
      title: "Maavan Mp3 Song by Arjan Dhillon.",
    },
    {
      id: "Ki_Hoya_PenduJatt.Com.Se_utay6l",
      title: "Ki Hoya mp3 song by B Praak Afsana Khan.",
    },
    {
      id: "DONALI_-_Harkirat_Sangha_a2lzoh",
      title: "DONALI mp3 song by Harkirat Sangha Starboy X.",
    },
    {
      id: "Bars_-_Shubh_ylgaun",
      title: "Bars mp3 song by Shubh in album Bars.",
    },
    {
      id: "GG_-_Gurinder_Gill_lwab20",
      title: "GG mp3 song by Gurinder Gill.",
    },
    {
      id: "Moon_Calling_-_Gur_Sidhu_rvdgyz",
      title: "Moon Calling mp3 song by Gur Sidhu Neha Kakkar.",
    },
    {
      id: "Tooti_Boldi_-_Hunar_Sidhu_dhym8d",
      title: "Tooti Boldi mp3 song by Hunar Sidhu in album Tooti Boldi.",
    },
    {
      id: "MEHFIL_-_Gulab_Sidhu_inzztw",
      title: "Mehfil mp3 song by Gulab Sidhu in album Mehfil.",
    },
    {
      id: "Zero_Tolerance_DjPunjab.Farm_xwawvc",
      title: "Zero Tolerance mp3 song by Sukh Kairon in album Zero Tolerance.",
    },
  ];

  const handleClick = async (songIndex) => {
    if (isLoading) return;
    setIsLoading(true);

    const song = newPunjabiSongs[songIndex];
    const API_URL = "https://beatmusic-backend.onrender.com";
    try {
      const response = await fetch(`${API_URL}/api/songs/${song.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      const songUrl = data.file_path;
      console.log("Fetched Song URL:", songUrl);

      if (!songUrl) {
        console.error("Invalid file path received:", songUrl);
        return;
      }

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

      const response = await fetch(
        "https://beatmusic-backend.onrender.com/api/favSongs/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: userID,
            songId: currentSong.id,
            title: currentSong.title,
          }),
        }
      );

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
    // eslint-disable-next-line
  }, [currentSong, isLoading, repeat, audioElement]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div
        className={
          isNavOpen ? "newmusicContainer blur-background" : "newmusicContainer"
        }
      >
        <h1 className="newmusicheading">New Punjabi Vibes Just for You 🎵</h1>
      </div>
      <hr className="newMusicHr"></hr>
      <div
        className={
          isNavOpen
            ? "newmusicContainer1 blur-background"
            : "newmusicContainer1"
        }
      >
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
