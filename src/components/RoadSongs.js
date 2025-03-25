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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newPunjabiSongs = [
    {
      id: "Bars_-_Shubh_ylgaun",
      title: "Bars mp3 song by Shubh in album Bars.",
    },
    {
      id: "MEHFIL_-_Gulab_Sidhu_inzztw",
      title: "Mehfil mp3 song by Gulab Sidhu in album Mehfil.",
    },
    {
      id: "Freestyle_-_Jordan_Sandhu_tohesy",
      title: "Freestyle mp3 song by Jordan Sandhu in album Fame - EP.",
    },
    {
      id: "Gasoline_-_Jordan_Sandhu_jjh1zz",
      title: "Gasoline mp3 song by Jordan Sandhu.",
    },
    {
      id: "Tu_Te_Sharab_DjPunjab.Farm_pztapa",
      title: "Tu Te Sharab mp3 song by Jordan Sandhu in album Tu Te Sharab.",
    },
    { id: "Bapu_Zimidar_hmqxlz", title: "Bapu Zimidar - Jassi Gill." },
    {
      id: "Yes_No_-_Gulab_Sidhu_mh0h34",
      title: "Yes No mp3 song by Gulab Sidhu.",
    },
    { id: "Got_You_-_G_Khan_nfkweh", title: "Got You song by G Khan." },
    {
      id: "Nattiyaan_-_Shipra_Goyal_tt5zqc",
      title: "Nattiyaan song by Shipra Goyal.",
    },
    {
      id: "Pyaar_Hoya_-_Hustinder_pf5o2x",
      title: "Pyaar Hoya song by Hustinder. ",
    },
    {
      id: "La_La_La_La_Hoi_Pai_Aa_-_Hunar_Sidhu_jcpbo9",
      title: "La La La Hoi Pai Aa song by Hunar Sidhu.",
    },
    { id: "Filter_-_Gulab_Sidhu_cvqdpx", title: "Filter song by Gulab Sidhu." },
    {
      id: "Tera_Yaar_Rakane_-_Shree_Brar_iyujc9",
      title: " Tera Yaar Rakane song by Shree Brar.",
    },
    {
      id: "Do_Vaari_Jatt_1_sojk1a",
      title: "Do Vaari Jatt mp3 song by Jordan Sandhu.",
    },
    {
      id: "Teeje_Week_-_Jordan_Sandhu_i4wets",
      title: "Teeje Week mp3 song by Jordan Sandhu in album Teeje Week.",
    },
    {
      id: "Khalipan_-_Nirvair_Pannu_wxhyaq",
      title: "Khalipan song by Nirvair Pannu.",
    },
    { id: "Tikka_-_Gulab_Sidhu_k36iv6", title: "Tikka song by Gulab Sidhu." },
    {
      id: "Andaaze_-_Khan_Bhaini_o2xomj",
      title: "Andaaze song by Khan Bhaini.",
    },
    {
      id: "Snapchat_-_Surjit_Bhullar_ponrhs",
      title: "Snapchat song by Surjit Bhullar.",
    },
    {
      id: "Dont_You_Dare_-_Hustinder_m2hhmf",
      title: "Don't You Dare by Hustinder.",
    },
    {
      id: "Sohneya_Sunidhi_Chauhan_Happy_Raikoti_vqc9vy",
      title: "Sohneya song by Happy Raikoti.",
    },
    {
      id: "Lahore_-_Gulab_Sidhu_foaaqk",
      title: "Lahore song by Gulab Sidhu.",
    },
    {
      id: "Fomo_1_ohz3qx",
      title: "Fomo mp3 song by Jordan Sandhu.",
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
      id: "Wavy_-_Karan_Aujla_xv4izd",
      title: "WAVY mp3 song by Karan Aujla.",
    },
    {
      id: "DONALI_-_Harkirat_Sangha_a2lzoh",
      title: "DONALI mp3 song by Harkirat Sangha Starboy X.",
    },
    {
      id: "Aaye_Haaye_-_Karan_Aujla_kjflbl",
      title: "Aaye Haaye song by Karan Aujla.",
    },
    {
      id: "128-Hass_Hass_-_Diljit_Dosanjh_128_Kbps_xwmbnw",
      title: "Hass Hass song by Diljit Dosanjh.",
    },
    {
      id: "Talk_DJJOhAL.Com_fxj05r",
      title: "Talk song by Jordan Sandhu.",
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
      <div
        className={
          isNavOpen ? "newmusicContainer blur-background" : "newmusicContainer"
        }
      >
        <h1 className="newmusicheading">
          Hit the Road with These Ultimate Driving Jams 🚗🎵
        </h1>
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
