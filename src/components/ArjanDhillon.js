import React, { useState, useEffect } from "react";
import PlayerControl from "./PlayerControl";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "../state/audioSlice";
import { addFavorite } from "../state/favouriteSlice";
import { useNavigate } from "react-router-dom";

const ArjanDhillon = ({ isNavOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(false);
  const { isPlaying, currentSong, audioElement } = useSelector(
    (state) => state.audio
  );
  const userID = useSelector((state) => state.user.userID);
  const favouriteSongs = useSelector((state) => state.favourite.songs) || [];
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const songs = [
    {
      id: "Gutt_-_Raag.Fm_k58j9w",
      title: "Gutt mp3 song by Arjan Dhillon.",
    },
    {
      id: "Tu_Jdo_Auna_b91xys",
      title: "Tu Jdo Auna mp3 song by Arjan Dhillon.",
    },
    {
      id: "2-2_Asle_-_Arjan_Dhillon_vuvccp",
      title: "2-2 Asle mp3 song by Arjan Dhillon.",
    },
    {
      id: "Chah_Pindan_Di_-_Djjohal.fm_v1vjot",
      title: "Chah Pindan Di mp3 song by Arjan Dhillon.",
    },
    {
      id: "Hun_Ok_Hoye_Pye_aa_-_Djjohal.fm_gpafr8",
      title: "Hun Ok Hoye Pye aa mp3 song by Arjan Dhillon.",
    },
    {
      id: "Vatt_Da_Raula_1_fb5vaf",
      title: "Vatt Da Raula mp3 song by Arjan Dhillon.",
    },
    {
      id: "Paparazzi_-_Djjohal.fm_qmc5hd",
      title: "Paparazzi mp3 song by Arjan Dhillon.",
    },
    {
      id: "Style_-_Djjohal.fm_eca7uo",
      title: "Style mp3 song by Arjan Dhillon.",
    },
    {
      id: "Nain_-_Djjohal.fm_dxb0qd",
      title: "Nain mp3 song by Arjan Dhillon.",
    },
    {
      id: "Sher-E-Panjab_-_Arjan_Dhillon_hymvcz",
      title: "Sher-E-Panjab mp3 song by Arjan Dhillon.",
    },
    {
      id: "Jawani_-_Raag.Fm_cxnt8s",
      title: "Jawani mp3 song by Arjan Dhillon.",
    },
    {
      id: "Worldwide_-_Djjohal.fm_kbudew",
      title: "Worldwide mp3 song by Arjan Dhillon.",
    },
    {
      id: "Calculations_-_Djjohal.fm_tkqryl",
      title: "Calculations mp3 song by Arjan Dhillon.",
    },
    {
      id: "Hazur_-_Djjohal.fm_pkbqb9",
      title: "Hazur mp3 song by Arjan Dhillon.",
    },
    {
      id: "Heer_-_Djjohal.fm_1_uoiyjy",
      title: "Heer mp3 song by Arjan Dhillon.",
    },
    {
      id: "Hot_Shit_-_Djjohal.fm_gngv3x",
      title: "Hot Shit mp3 song by Arjan Dhillon.",
    }, {
      id: "Ki_Karde_Je_PenduJatt.Com.Se_gbayxi",
      title: "Ki Karde Je mp3 song by Nimrat Khaira.",
    },
    {
      id: "Likhari_-_Djjohal.fm_d51kp6",
      title: "Likhari mp3 song by Arjan Dhillon.",
    },
    {
      id: "Daaru_Sasti_-_Djjohal.fm_gt1odp",
      title: "Daaru Sasti mp3 song by Arjan Dhillon.",
    },
    {
      id: "Tha_Karke_-_Djjohal.fm_dbozpy",
      title: "Tha Karke mp3 song by Arjan Dhillon.",
    },
    {
      id: "Munde_Pindan_De_-_Djjohal.fm_b4pphx",
      title: "Munde Pindan De mp3 song by Arjan Dhillon.",
    },
    {
      id: "Long_Back_-_Djjohal.fm_yv9by2",
      title: "Long Back mp3 song by Arjan Dhillon.",
    },
    {
      id: "Zigana_-_Arjan_Dhillon_micchn",
      title: "Zigana mp3 song by Arjan Dhillon.",
    },
    {
      id: "Parallel_Thoughts_-_Raag.Fm_krqefp",
      title: "Parallel Thoughts mp3 song by Arjan Dhillon.",
    },
    {
      id: "Panjabi-Arjan-Dhillon_pnatk6",
      title: "Panjabi mp3 song by Arjan Dhillon.",
    },
    {
      id: "Brats_-_Arjan_Dhillon_c1lnfo",
      title: "Brats mp3 song by Arjan Dhillon.",
    },
    {
      id: "Jeona_-_Raag.Fm_osixyy",
      title: "Jeona mp3 song by Arjan Dhillon.",
    },
    {
      id: "Rabb_-_Raag.Fm_mqfylw",
      title: "Rabb mp3 song by Arjan Dhillon.",
    },
    {
      id: "More_Beautiful_-_Raag.Fm_epi5oq",
      title: "More Beautiful mp3 song by Arjan Dhillon.",
    },
    {
      id: "Hommie_Call_-_Raag.Fm_woftsn",
      title: "Hommie Call mp3 song by Arjan Dhillon.",
    },
    {
      id: "Hold_On_-_Raag.Fm_mc0hdt",
      title: "Hold On mp3 song by Arjan Dhillon.",
    },
    {
      id: "Dunia-Arjan-Dhillon_uuocq8",
      title: "Dunia mp3 song by Arjan Dhillon.",
    },
    {
      id: "Bai_Bai_-_Raag.Fm_f90gqc",
      title: "Bai Bai mp3 song by Arjan Dhillon.",
    },
    {
      id: "25-25_-_Raag.Fm_eismfr",
      title: "25-25 mp3 song by Arjan Dhillon.",
    },
    {
      id: "Opinion_-_Raag.Fm_rzd3e5",
      title: "Opinion mp3 song by Arjan Dhillon.",
    },
  ];

  const handleClick = async (songIndex) => {
    if (isLoading) return;
    setIsLoading(true);

    const song = songs[songIndex];
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

  return (
    <>
      <div
        className={
          isNavOpen ? "musicContainer1 blur-background" : "musicContainer1"
        }
      >
        <div
          className={
            isNavOpen
              ? "specialmusicContainer2 blur-background"
              : "specialmusicContainer2"
          }
        >
          {songs.map((song, index) => (
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
      <PlayerControl
        audio={audioElement}
        handleNext={handleNext}
        handlePlayPause={handlePlayPause}
        isPlaying={isPlaying}
        handlePrevious={handlePrevious}
        handleRepeat={handleRepeat}
        handleFavourite={handleFavourite}
      />
    </>
  );
};

export default ArjanDhillon;
