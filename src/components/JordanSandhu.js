import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playAudio, pauseAudio } from "../state/audioSlice";
import PlayerControl from "./PlayerControl";
import { addFavourite, removeFavourite } from "../state/favouriteSlice";

const JordanSandhu = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
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
      id: "67937e6a47bdbe218604426c",
      title: "Tareefan mp3 song by Jordan Sandhu in album Tareefan.",
    },
    {
      id: "67937ed747bdbe218604426e",
      title: "Munda Sardaran Da mp3 song by Jordan Sandhu.",
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
      id: "67937f6e47bdbe2186044274",
      title: "Chobbar mp3 song by Jordan Sandhu.",
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
      id: "67937ffa47bdbe218604427a",
      title: "Mirrors mp3 song by Jordan Sandhu.",
    },
    {
      id: "6793806a47bdbe218604427c",
      title:
        "Black Effect mp3 song by Jordan Sandhu in album Black Effect - Single.",
    },
    {
      id: "6793809447bdbe218604427e",
      title: "Freestyle mp3 song by Jordan Sandhu in album Fame - EP.",
    },
    {
      id: "679380b647bdbe2186044280",
      title: "Gasoline mp3 song by Jordan Sandhu.",
    },
    {
      id: "679380e547bdbe2186044282",
      title: "Tu Te Sharab mp3 song by Jordan Sandhu in album Tu Te Sharab.",
    },
    {
      id: "6793812c47bdbe2186044284",
      title: "Jimmewari mp3 song by Jordan Sandhu.",
    },
    {
      id: "679381e247bdbe2186044286",
      title: "Season mp3 song by Jordan Sandhu.",
    },
    {
      id: "6793820b47bdbe2186044288",
      title: "Love Like This mp3 song by Jordan Sandhu.",
    },
    {
      id: "6793823b47bdbe218604428a",
      title: "Never Hear Out mp3 song by Jordan Sandhu.",
    },
    {
      id: "6793826c47bdbe218604428c",
      title: "At a Loss mp3 song by Jordan Sandhu.",
    },
    {
      id: "679382a147bdbe218604428e",
      title: "Rafflan De Butt mp3 song by Jordan Sandhu.",
    },
    {
      id: "679382f347bdbe2186044290",
      title: "Everyone Asks mp3 song by Jordan Sandhu.",
    },
    {
      id: "6793832b47bdbe2186044292",
      title: "Rank 1 mp3 song by Jordan Sandhu in album Rank 1 - Single.",
    },
    {
      id: "6793835547bdbe2186044294",
      title:
        "Shehar Vichon Geda mp3 song by Jordan Sandhu in album Shehar Vichon Geda - Single.",
    },
    {
      id: "679383de47bdbe2186044296",
      title: "Zulfaan mp3 song by Jordan Sandhu in album Zulfaan - Single.",
    },
    {
      id: "6793841247bdbe2186044298",
      title:
        "Nimm Thalle mp3 song by Jordan Sandhu in album Nimm Thalle - Single.",
    },
  ];

  const handleClick = async (songIndex) => {
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
    if (!currentSong) return;

    const isFavourite = favouriteSongs.some((fav) => fav.id === currentSong.id);

    if (isFavourite) {
      dispatch(removeFavourite(currentSong.id));
    } else {
      dispatch(addFavourite(currentSong));
    }
  };

  useEffect(() => {
    const audio = audioElement;
    const handleEnded = () => {
      handleNext();
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, isLoading]);

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
      />
    </>
  );
};

export default JordanSandhu;
