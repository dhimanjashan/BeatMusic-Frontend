import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "../state/audioSlice";
import { addFavorite } from "../state/favouriteSlice";
import PlayerSystem from "./PlayerSystem";
import PlayerControl from "./PlayerControl";
import { useNavigate } from "react-router-dom";

const PunjabiMusic = () => {
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
  const songs = [
    {
      id: "Fomo_1_ohz3qx",
      title: "Fomo mp3 song by Jordan Sandhu.",
    },
    {
      id: "Ammi_Wargiye_Ni_-_Shree_Brar_rq59b9",
      title: "Ammi Wargiye Ni mp3 song by Shree Brar.",
    },
    {
      id: "Yes_No_-_Gulab_Sidhu_mh0h34",
      title: "Yes No mp3 song by Gulab Sidhu.",
    },
    {
      id: "Defender_DJJOhAL.Com_a6cio1",
      title: "Defender new song by Harf Cheema.",
    },
    {
      id: "Andaaze_-_Khan_Bhaini_o2xomj",
      title: "Andaaze song by Khan Bhaini.",
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
      id: "Khalipan_-_Nirvair_Pannu_wxhyaq",
      title: "Khalipan song by Nirvair Pannu.",
    },
    { id: "Tikka_-_Gulab_Sidhu_k36iv6", title: "Tikka song by Gulab Sidhu." },
    {
      id: "Roti_Pani_1_rdcbk2",
      title: "Roti Pani song by Jass Bajwa.",
    },
    {
      id: "Sarpanchi_uxtwjl",
      title: "Sarpanchi song by Gulab Sidhu.",
    },
    {
      id: "Taur_Tappa_1_ry2mt9",
      title: "Taur Tappa song by Shivjot.",
    },
    { id: "295_-_Sidhu_Moose_Wala_ilcxrt", title: "295 - Sidhu Moosewala." },
    { id: "Bapu_Zimidar_hmqxlz", title: "Bapu Zimidar - Jassi Gill." },
    {
      id: "DONALI_-_Harkirat_Sangha_a2lzoh",
      title: "DONALI song by Harkirat Sangha.",
    },
    {
      id: "MEHFIL_-_Gulab_Sidhu_inzztw",
      title: "Mehfil song by Gulab Sidhu.",
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
      id: "Aaye_Haaye_-_Karan_Aujla_kjflbl",
      title: "Aaye Haaye song by Karan Aujla.",
    },
    {
      id: "Tiyariyan_Satinder_Sartaaj_kq5wrc",
      title: "Tiyariyan song by Satinder Sartaaj.",
    },
    { id: "Sade_Jehe_-_R_Nait_w5g6fa", title: " Sade Jehe song by R Nait." },
    {
      id: "Sunday_Dilpreet_Dhillon_Gurlez_Akhtar_mlpjqs",
      title: "Sunday song by Dilpreet Dhillon.",
    },
    {
      id: "Nazran_-_Nirvair_Pannu_yfe07w",
      title: "Nazran song by Nirvair Pannu.",
    },
    {
      id: "Jawani_-_Gulab_Sidhu_p0it8l",
      title: "Jawani song by Gulab Sidhu.",
    },
    {
      id: "Not_Sure_-_Cheema_Y_bmsvhm",
      title: "Not Sure Mp3 song by Cheema Y.",
    },
    {
      id: "Tu_Takkri_-_Hustinder_uatz0k",
      title: "Tu Takkri Mp3 song by Hustinder.",
    },
    {
      id: "Rangeen_icvuhd",
      title: "Rangeen Song by Gurnam Bhullar.",
    },
    {
      id: "Blackia_-_Geeta_Zaildar_ujgjtu",
      title: "Blackia song by Geeta Zaildar.",
    },
    {
      id: "Gucci_Gabhru_1_ndvcoe",
      title: "Gucci Gabhru song by Harkirat Sangha.",
    },
    {
      id: "128-Hass_Hass_-_Diljit_Dosanjh_128_Kbps_xwmbnw",
      title: "Hass Hass song by Diljit Dosanjh.",
    },
    {
      id: "Talk_DJJOhAL.Com_fxj05r",
      title: "Talk song by Jordan Sandhu.",
    },
    {
      id: "Tu_Jdo_Auna_b91xys",
      title: "Tu Jdo Auna song by Arjan Dhillon.",
    },
    {
      id: "Laara_-_Nirvair_Pannu_um1gjp",
      title: "Laara song by Nirvair Pannu.",
    },
    {
      id: "Mirrors_-_Jordan_Sandhu_itmrav",
      title: "Mirrors song by Jordan Sandhu.",
    },
    {
      id: "Veham_-Harf_Cheema-_JattZone.com_rylvpb",
      title: "Veham song by Harf Cheema.",
    },
    {
      id: "Off_Roading_1_mto0kb",
      title: "Off Roading by Khan Bhaini.",
    },
    {
      id: "Vehli_Janta_2_zfbtzg",
      title: "Vehli Janta song by Kulbir Jhinjer.",
    },
    {
      id: "Pakhe_Chalde_-_Jass_Bajwa_n5ox3d",
      title: "Pakhe Chalde song by Jass Bajwa.",
    },
    {
      id: "Nimm_Thalle_1_rj3moo",
      title: "Nimm Thalle song by Jordan Sandhu.",
    },
    { id: "_Taj_-_Veet_Baljit_gdz7fa", title: "Taj  song by Veet Baljit." },
    {
      id: "Gol_Chowk_-_Hustinder_phzdcz",
      title: " Gol Chowk song by Hustinder.",
    },
    { id: "Be_Mine_-_Shubh_ahramc", title: "Be Mine song by Shubh." },
    {
      id: "Changa_Changa_-_R_Nait_uddtcn",
      title: "Changa Changa song by R Nait.",
    },
    {
      id: "Fella_S_Forever_-_Hustinder_vzybus",
      title: "Fella S Forever song by Hustinder.",
    },
    {
      id: "Time_Chakda_-_Nimrat_Khaira_cutnos",
      title: "Time Chakda song by Nimrat Khaira.",
    },
    {
      id: "Opinion_-_Raag.Fm_rzd3e5",
      title: "Opinion song by Arjan Dhillon.",
    },
    {
      id: "Parlour_Te_1_whyxoy",
      title: "Parlour Te song by Sunanda Sharma.",
    },
    {
      id: "Brats_-_Arjan_Dhillon_c1lnfo",
      title: "Brats song by Arjan Dhillon.",
    },
    {
      id: "Barkat_-_Ranjit_Bawa_sxfp1e",
      title: "Barkat song by Ranjit Bawa.",
    },
    {
      id: "Cat_Walk_-_Hustinder_lqx9li",
      title: "Cat Walk song by Hustinder.",
    },
    {
      id: "Hommie_Call_-_Raag.Fm_woftsn",
      title: "Hommie Call song by Arjan Dhillon.",
    },
    {
      id: "Zulfaan_1_p1oluv",
      title: "Zulfaan song by Jordan Sandhu.",
    },
    {
      id: "Wavy_-_Karan_Aujla_xv4izd",
      title: "WAVY song by Karan Aujla.",
    },
    {
      id: "Parallel_Thoughts_-_Raag.Fm_krqefp",
      title: "Parallel Thoughts song by Arjan Dhillon.",
    },
    {
      id: "Gall_Mukk_Gyi_-_Nimrat_Khaira_r7f6ta",
      title: "Gall Mukk Gyi song by Nimrat Khaira.",
    },
    {
      id: "Karnatak_-_Harkirat_Sangha_pdtugc",
      title: "Karnatak song by Harkirat Sangha.",
    },
  ];

  const handleClick = async (songIndex) => {
    if (isLoading) return;
    setIsLoading(true);

    const song = songs[songIndex];
    const API_URL = "http://172.20.10.4:5000";
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
      <div className="PunjabiSongsContainer">
        <h1 className="PunjabiSongsheading">
          Explore the Best Punjabi Songs 🎵
        </h1>
      </div>
      <hr></hr>
      <div className="punjabiSongsContainer2">
        <div className="punjabiSongsContainer3">
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
    </>
  );
};

export default PunjabiMusic;
