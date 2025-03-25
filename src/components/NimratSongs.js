import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "../state/audioSlice";
import PlayerControl from "./PlayerControl";
import { addFavorite } from "../state/favouriteSlice";
import { useNavigate } from "react-router-dom";

const NimratSongs = ({ isNavOpen }) => {
  console.log(isNavOpen);
  const [repeat, setRepeat] = useState(false);
  const audioRef = useRef(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isPlaying, currentSong, audioElement } = useSelector(
    (state) => state.audio
  );
  const userID = useSelector((state) => state.user.userID);
  const favouriteSongs = useSelector((state) => state.favourite.songs) || [];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const songs = [
    {
      id: "Sohne_Sohne_Suit_-_Nimrat_Khaira_qvj4l2",
      title: "Sohne Sohne Suit mp3 song by Nimrat Khaira.",
    },
    {
      id: "Suit_ncvgpu",
      title: "Suit mp3 song by Nimrat Khaira featuring Mankirt Aulakh.",
    },
    {
      id: "Supna_Laavan_Da_-_Nimrat_Khaira_r2xix2",
      title: "Supna Lavaan Da mp3 song by Nimrat Khaira.",
    },
    {
      id: "Ranihaar_-_Nimrat_Khaira_psgiho",
      title: "Ranihaar mp3 song by Nimrat Khaira.",
    },
    {
      id: "Tohar_-_Nimrat_Khaira_mpr5zg",
      title: "Tohar mp3 song by Nimrat Khaira.",
    },
    {
      id: "Ajj_Kal_Ajj_Kal_-_Nimrat_Khaira_luijko",
      title: "Ajj Kal Ajj Kal mp3 song by Nimrat Khaira.",
    },
    {
      id: "Jaan_-_Nimrat_Khaira_gihuys",
      title: "Jaan mp3 song by Nimrat Khaira.",
    },
    {
      id: "Photo_-_Nimrat_Khaira_pk7qxd",
      title: "Photo mp3 song by Nimrat Khaira.",
    },
    {
      id: "Blink_-_Nimrat_Khaira_oauzuf",
      title: "Blink mp3 song by Nimrat Khaira.",
    },
    {
      id: "Ki_Karde_Je_PenduJatt.Com.Se_gbayxi",
      title: "Ki Karde Je mp3 song by Nimrat Khaira.",
    },
    {
      id: "Sangdi_Sangdi_-_Tarsem_Jassar_q3uogr",
      title: "Sangdi Sangdi mp3 song by Nimrat Khaira.",
    },
    {
      id: "What_Ve_-_Diljit_Dosanjh_sfzwof",
      title: "What Ve mp3 song by Nimrat Khaira.",
    },
    {
      id: "Dasi_Kithe_Rehna_-_Arjan_Dhillon_kigba5",
      title: "Dasi Kithe Rehna mp3 song by Nimrat Khaira.",
    },
    {
      id: "Chan_Wargi_-_Diljit_Dosanjh_stzvjw",
      title: "Chan Wargi mp3 song by Nimrat Khaira.",
    },
    {
      id: "Shikayatan_-_Nimrat_Khaira_ayotgk",
      title: "Shikayatan mp3 song by Nimrat Khaira.",
    },
    {
      id: "Gulabi_Rang_-_Nimrat_Khaira_bu5rpl",
      title: "Gulabi Rang mp3 song by Nimrat Khaira.",
    },
    {
      id: "Designer_-_Nimrat_Khaira_r10foz",
      title: "Designer mp3 song by Nimrat Khaira.",
    },
    {
      id: "Lehnga_-_Nimrat_Khaira_el9fqx",
      title: "Lehnga mp3 song by Nimrat Khaira.",
    },
    {
      id: "Ishq_Kacheri_-_Nimrat_Khaira_amzmex",
      title: "Ishq Kacheri mp3 song by Nimrat Khaira.",
    },
    {
      id: "Time_Chakda_-_Nimrat_Khaira_cutnos",
      title: "Time Chakda mp3 song by Nimrat Khaira.",
    },
    {
      id: "SP_De_Rank_Wargi_-_Nimrat_Khaira_mk9btg",
      title: "SP De Rank Wargi mp3 song by Nimrat Khaira.",
    },
    {
      id: "Gall_Mukk_Gyi_-_Nimrat_Khaira_r7f6ta",
      title: "Gall Mukk Gyi mp3 song by Nimrat Khaira",
    },
    {
      id: "Salute_Vajde_-_Nimrat_Khaira_ofnw7k",
      title: "Salute Vajde mp3 song by Nimrat Khaira.",
    },
    {
      id: "Rohb_Rakhdi_-_Nimrat_Khaira_vsjpvu",
      title: "Rohab Rakhdi mp3 song by Nimrat Khaira.",
    },
    {
      id: "Sira_E_Hou_-_Amrit_Maan_orwczh",
      title: "Sira E Hou mp3 song by Nimrat Khaira featuring Amrit Maan.",
    },
  ];

  const handleClick = async (songIndex) => {
    console.log("Here");
    if (isLoading) return;
    setIsLoading(true);

    const song = songs[songIndex];
    console.log("Selected Song ID:", song.id);
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
      if (audioElement) {
        audioElement.removeEventListener("ended", handleEnded);
      }
    };
    // eslint-disable-next-line
  }, [currentSong, isLoading, repeat, audioElement]);

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
      </div>
    </>
  );
};

export default NimratSongs;
