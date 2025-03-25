import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "../state/audioSlice";
import PlayerControl from "./PlayerControl";
import { addFavorite } from "../state/favouriteSlice";
import { useNavigate } from "react-router-dom";

const JordanSandhu = ({ isNavOpen }) => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const songs = [
    {
      id: "Fomo_1_ohz3qx",
      title: "Fomo mp3 song by Jordan Sandhu.",
    },
    {
      id: "Snowfall_1_knz73b",
      title: "Snowfall mp3 song by Jordan Sandhu.",
    },
    {
      id: "Positivity_1_cv3n90",
      title: "Positivity mp3 song by Jordan Sandhu.",
    },
    {
      id: "Thank_God_-_Jordan_Sandhu_sqwjth",
      title: "Thank God mp3 song by Jordan Sandhu.",
    },
    {
      id: "DJJOhAL.Com_3_yul1o6",
      title: "Bebe Di Pasand mp3 song by Jordan Sandhu.",
    },
    {
      id: "Sardaar_Bandey_1_fhpxkp",
      title: "Sardar Bandey mp3 song by Jordan Sandhu.",
    },
    {
      id: "Birthday_-_Jordan_Sandhu_sdgqmg",
      title: "Birthday mp3 song by Jordan Sandhu.",
    },
    {
      id: "Out_Of_Stock_1_srbhkt",
      title: "Out Of Stock mp3 song by Jordan Sandhu.",
    },
    {
      id: "Jattiye_Ni_hmd2bq",
      title: "Jattiye Ni mp3 song by Jordan Sandhu.",
    },
    {
      id: "Band_Theke_1_d7sflt",
      title: "Band Theke mp3 song by Jordan Sandhu.",
    },
    {
      id: "Tareefan_1_uaeyb2",
      title: "Tareefan mp3 song by Jordan Sandhu in album Tareefan.",
    },
    {
      id: "Munda_Sardaran_Da_1_bbdocf",
      title: "Munda Sardaran Da mp3 song by Jordan Sandhu.",
    },
    {
      id: "Chann_Chann_-_Jordan_Sandhu_upj3ee",
      title: "Chann Chann mp3 song by Jordan Sandhu.",
    },
    {
      id: "Jyada_Jachdi_1_mjhp4b",
      title: "Jyada Jachdi mp3 song by Jordan Sandhu.",
    },
    {
      id: "Mashoor_Ho_Giya_1_skv6vx",
      title: "Mashoor Ho Giya mp3 song by Jordan Sandhu.",
    },
    {
      id: "Peacock_1_sdiqo2",
      title: "Peacock mp3 song by Jordan Sandhu.",
    },
    {
      id: "Ford_Baapu_Da_1_bcsgrr",
      title: "Ford Bapu Da mp3 song by Jordan Sandhu.",
    },
    {
      id: "Botal_Free_1_iiewia",
      title: "Botal Free mp3 song by Jordan Sandhu.",
    },
    {
      id: "Pre_Workout_-_Jordan_Sandhu_mw1esw",
      title: "Pre Workout mp3 song by Jordan Sandhu.",
    },
    {
      id: "Chobbar_1_wwmyji",
      title: "Chobbar mp3 song by Jordan Sandhu.",
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
      id: "Mirrors_-_Jordan_Sandhu_itmrav",
      title: "Mirrors mp3 song by Jordan Sandhu.",
    },
    {
      id: "Black_Effect_1_vrfr71",
      title:
        "Black Effect mp3 song by Jordan Sandhu in album Black Effect - Single.",
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
    {
      id: "Jimmewari_-_Jordan_Sandhu_t3d5v8",
      title: "Jimmewari mp3 song by Jordan Sandhu.",
    },
    {
      id: "Season_-_Jordan_Sandhu_b9rkjr",
      title: "Season mp3 song by Jordan Sandhu.",
    },
    {
      id: "Nimm_Thalle_1_rj3moo",
      title:
        "Nimm Thalle mp3 song by Jordan Sandhu in album Nimm Thalle - Single.",
    },
    {
      id: "Love_Like_This_-_Jordan_Sandhu_jmvxbc",
      title: "Love Like This mp3 song by Jordan Sandhu.",
    },
    {
      id: "Never_Hear_Out_feat._Noval_Toor_-_Jordan_Sandhu_ygyvjd",
      title: "Never Hear Out mp3 song by Jordan Sandhu.",
    },
    {
      id: "At_A_Loss_-_Jordan_Sandhu_x2ppmg",
      title: "At a Loss mp3 song by Jordan Sandhu.",
    },
    {
      id: "Rafflan_De_Butt_-_Jordan_Sandhu_kircrk",
      title: "Rafflan De Butt mp3 song by Jordan Sandhu.",
    },
    {
      id: "Everyone_Asks_-_Jordan_Sandhu_zlvof7",
      title: "Everyone Asks mp3 song by Jordan Sandhu.",
    },
    {
      id: "128-Rank_1_-_Never_Before_128_Kbps_sgcf3j",
      title: "Rank 1 mp3 song by Jordan Sandhu in album Rank 1 - Single.",
    },
    {
      id: "Shehar_Vichon_Geda_-_Raag.Fm_lyf4sa",
      title:
        "Shehar Vichon Geda mp3 song by Jordan Sandhu in album Shehar Vichon Geda - Single.",
    },
    {
      id: "Zulfaan_1_p1oluv",
      title: "Zulfaan mp3 song by Jordan Sandhu in album Zulfaan - Single.",
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
      const songUrl = data.file_path; // ✅ Use file_path from response
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
      audioElement.removeEventListener("ended", handleEnded);
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

export default JordanSandhu;
