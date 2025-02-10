import React, { useEffect, useState, useRef } from "react";
import PlayerControl from "./PlayerControl";
import PlayerSystem from "./PlayerSystem";

const Newmusic = () => {
  const audioRef = useRef(null);
  const [currentSong, setcurrentSong] = useState(null);
  const [isPlaying, setisPlaying] = useState(false);
  const [isLoading, setisLoading] = useState(null);
  const [favouriteSong, setFavouriteSong] = useState(null);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newPunjabiSongs = [
    { id: "67a45a6e5886b255ee475705", title: "1. Bhabhi Mp3 song by Nijjar." },
    {
      id: "67a45b5c5886b255ee475707",
      title: "2. Tu Takkri Mp3 song by Hustinder.",
    },
    {
      id: "67a45df45886b255ee475709",
      title: "3. Defender MP3 Song by Harf Cheema.",
    },
    {
      id: "67a45e325886b255ee47570b",
      title: "4. Barkat Mp3 song by Ranjit Bawa.",
    },
    {
      id: "67a7123531755642e981aaa5",
      title: "5. Karnatak mp3 song by Harkirat Sangha.",
    },
    {
      id: "67a45e845886b255ee47570d",
      title: "6. Not Sure Mp3 song by Cheema Y.",
    },
    {
      id: "67a45eb65886b255ee47570f",
      title: "7. Bachke Bachke mp3 song by Karan Aujla in album Still Rollin.",
    },
    {
      id: "67a45f585886b255ee475711",
      title:
        "8. Rangeen Single Track Mp3 Song From Album Rangeen by Gurnam Bhullar.",
    },
    {
      id: "67a45f965886b255ee475713",
      title:
        "9. Lock mp3 song by Sidhu Moose Wala The Kidd in album Lock - Single.",
    },
    {
      id: "67a45fd45886b255ee475715",
      title: "10. Buckle Up mp3 song by Shubh in album Buckle Up - Single.",
    },
    {
      id: "67a460145886b255ee475717",
      title:
        "11. Main Aa Reha mp3 song by Juss MixSingh in album Main Aa Reha - Single.",
    },
    {
      id: "67a4604b5886b255ee475719",
      title: "12. Carti mp3 song by Shubh in album Carti - Single.",
    },
    {
      id: "67a460885886b255ee47571b",
      title: "13. Rumaal mp3 song by Maninder Buttar in album Rumaal - Single.",
    },
    {
      id: "67a460c35886b255ee47571d",
      title:
        "14. Bai Kol mp3 song by R Nait JP47 Mad Mix in album Bai Kol - Single.",
    },
    {
      id: "67a461025886b255ee47571f",
      title: "15. Dheeth Jatta Mp3 song by Chandra Brar in album Dheeth.",
    },
    {
      id: "67a4613a5886b255ee475721",
      title: "16. WAVY mp3 song by Karan Aujla in album WAVY - Single.",
    },
    {
      id: "67a4616f5886b255ee475723",
      title:
        " 17. Sit Down Son mp3 song by Navaan Sandhu Avvy Rxtro in album Sit Down Son - Single.",
    },
    {
      id: "67a4625b5886b255ee475729",
      title: "18. Maavan Mp3 Song by Arjan Dhillon.",
    },
    {
      id: "67a462955886b255ee47572b",
      title:
        "19. Ki Hoya mp3 song by B Praak Afsana Khan in album Ki Hoya - Single.",
    },
    {
      id: "67a462eb5886b255ee47572d",
      title:
        "20. DONALI mp3 song by Harkirat Sangha Starboy X in album DONALI - Single.",
    },
    {
      id: "67a463195886b255ee47572f",
      title: "21. Bars mp3 song by Shubh in album Bars - Single.",
    },
    {
      id: "67a463465886b255ee475731",
      title: "22. GG mp3 song by Gurinder Gill in album GG - Single.",
    },
    {
      id: "67a463735886b255ee475733",
      title:
        " 23. Moon Calling mp3 song by Gur Sidhu Neha Kakkar Kaptaan in album Moon Calling - Single.",
    },
    {
      id: "67a463aa5886b255ee475735",
      title:
        "24. Tooti Boldi mp3 song by Hunar Sidhu in album Tooti Boldi - Single.",
    },
    {
      id: "67a464155886b255ee475737",
      title: "25. Mehfil mp3 song by Gulab Sidhu in album Mehfil - Single.",
    },
    {
      id: "67a464515886b255ee475739",
      title:
        " 26. Zero Tolerance mp3 song by Sukh Kairon in album Zero Tolerance - Single.",
    },
  ];

  const handleClick = async (songIndex) => {
    if (isLoading) {
      return;
    }
    setisLoading(true);
    const song = newPunjabiSongs[songIndex];
    try {
      const response = await fetch("http://localhost:5000/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ songId: song.id }),
      });

      const data = await response.json();
      if (audioRef.current) {
        audioRef.current.src = data.file_path;
        audioRef.current.load();
        setcurrentSong(song);
        await audioRef.current.play();
        setisPlaying(true);
      }
    } catch (error) {
      console.error("Error fetching data from backend:", error);
    } finally {
      setisLoading(false);
    }
  };
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setisPlaying(!isPlaying);
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

  const handleRepeat = () => {
    setRepeat(!repeat);
  };

  useEffect(() => {
    const audio = audioRef.current;
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

  return (
    <>
      <div className="newmusicContainer">
        <h1 className="newmusicheading">
          Hanji Sohneyo Sunlo New Punjabi Songs
        </h1>
      </div>
      <hr></hr>
      <div className="newmusicContainer1">
        <PlayerSystem
          audio={audioRef.current}
          handleNext={handleNext}
          handlePlayPause={handlePlayPause}
          isPlaying={isPlaying}
          handlePrevious={handlePrevious}
          handleRepeat={handleRepeat}
        />
        {newPunjabiSongs.map((song, index) => (
          <p
            key={song.id}
            onClick={() => handleClick(index)}
            style={{
              cursor: "pointer",
              color: currentSong?.id === song.id ? "crimson" : "white",
              fontWeight: currentSong?.id === song.id ? "bold" : "normal",
            }}
          >
            {song.title}
          </p>
        ))}
      </div>
      <hr></hr>
      <div className="newmusicContainer">
        <h1 className="newmusicheading">
          Here is the List of New English Songs
        </h1>
      </div>
      <hr></hr>

      <div className="newmusicContainer2">
        <p>1. Anti-Hero mp3 song by Taylor Swift in album Midnights.</p>
        <p>2. As It Was mp3 song by Harry Styles in album Harry's House.</p>
        <p>
          3. Flowers mp3 song by Miley Cyrus in album Endless Summer Vacation.
        </p>
        <p>4. Kill Bill mp3 song by SZA in album SOS.</p>
        <p>5. Calm Down mp3 song by Rema Selena Gomez in album Rave & Roses.</p>
        <p>6. Unholy mp3 song by Sam Smith Kim Petras in album Gloria.</p>
        <p>
          7. Made You Look mp3 song by Meghan Trainor in album Takin' It Back.
        </p>
        <p>8. About Damn Time mp3 song by Lizzo in album Special.</p>
        <p>
          9. I'm Good (Blue) mp3 song by David Guetta Bebe Rexha in album I'm
          Good (Blue) - Single.
        </p>
        <p>10. Golden Hour mp3 song by JVKE in album Golden Hour - Single.</p>
        <p>
          11. Lift Me Up mp3 song by Rihanna in album Black Panther Wakanda
          Forever.
        </p>
        <p>
          12. Forget Me mp3 song by Lewis Capaldi in album Broken By Desire To
          Be Heavenly Sent.
        </p>
        <p>13. Shivers mp3 song by Ed Sheeran in album Equals.</p>
        <p>
          14. Stay mp3 song by The Kid LAROI Justin Bieber in album Stay -
          Single.
        </p>
        <p>
          15. Creepin' mp3 song by Metro Boomin The Weeknd 21 Savage in album
          Heroes & Villains.
        </p>
        <p>
          16. Nonsense mp3 song by Sabrina Carpenter in album Emails I Can't
          Send.
        </p>
        <p>17. Bad Habit mp3 song by Steve Lacy in album Gemini Rights.</p>
        <p>18. Die For You mp3 song by The Weeknd in album Starboy.</p>
        <p>19. Ghost mp3 song by Justin Bieber in album Justice.</p>
        <p>20. Easy On Me mp3 song by Adele in album 30.</p>
        <p>21. Blinding Lights mp3 song by The Weeknd in album After Hours.</p>
        <p>
          22. My Universe mp3 song by Coldplay BTS in album Music of the
          Spheres.
        </p>
        <p>23. Heat Waves mp3 song by Glass Animals in album Dreamland.</p>
        <p>24. Levitating mp3 song by Dua Lipa in album Future Nostalgia.</p>
        <p>25. Watermelon Sugar mp3 song by Harry Styles in album Fine Line.</p>
        <p>26. Shape of You mp3 song by Ed Sheeran.</p>
      </div>
      <audio ref={audioRef} />
    </>
  );
};

export default Newmusic;
