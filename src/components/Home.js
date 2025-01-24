import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Home = ({ setImage, setMusic,setArtistname }) => {
  const navigate = useNavigate();

  const handleamrinderClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("amrinder-gill.jpg");
    setMusic("Dildarian mp3 song download by Amrinder Gill in album Dildarian");
    setArtistname('Amrinder Gill')
  };
  const handlesunandaClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("sunanda-sharma.jpg");
    setMusic(
      "Parlour Te mp3 song download by Sunanda Sharma in album Parlour Te"
    );
    setArtistname('Sunanda Sharma')
  };
  const handlearjanClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("arjan-dhillon.jpg");
    setMusic("2-2 Asle mp3 song download by Arjan Dhillon in album 2-2 Asle");
    setArtistname('Arjan Dhillon')
  };
  const handlenimratClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("nimrat-khaira.jpg");
    // setMusic("Door Door mp3 song download by Nimrat Khaira in album Door Door");
    setArtistname('Nimrat Khaira')
  };
  const handlejordanClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("jordan-sandhu.jpg");
    setMusic(
      "Handsome Jatta mp3 song download by Jordan Sandhu in album Handsome Jatta"
    );
    setArtistname('Jordan Sandhu')
  };
  const handleEdsheeranClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("jordan-sandhu.jpg");
    setMusic("Edsheeran mp3 song download by Jordan Sandhu in album Edsheeran");
    setArtistname('Ed Sheeran')
  };
  const handleDualipaClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("jordan-sandhu.jpg");
    setMusic("Dualipa mp3 song download by Jordan Sandhu in album Dualipa");
    setArtistname('Dua Lipa')
  };
  const handleJustinbieberClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("jordan-sandhu.jpg");
    setMusic(
      "Justinbieber mp3 song download by Jordan Sandhu in album Justinbieber"
    );
    setArtistname('Justin Bieber')
  };
  const handleOliviarodrigoClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("jordan-sandhu.jpg");
    setMusic(
      "Oliviarodrigo mp3 song download by Jordan Sandhu in album Oliviarodrigo"
    );
    setArtistname('Olivia Rodrigo')
  };
  const handleSamsmithClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("jordan-sandhu.jpg");
    setMusic("Samsmith mp3 song download by Jordan Sandhu in album Samsmith");
    setArtistname('Sam Smith')
  };
  return (
    <>
      <h2 id="homeheading1">Top Punjabi Artist's playlist</h2>
      <div className="container3">
        <div className="box1">
          <div className="card">
            <img src="Amrinder Gill.jpg" id="image1"></img>
          </div>
          <button id="homebtn1" onClick={handleamrinderClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img src="sunanda sharma.png" id="image1"></img>
          </div>
          <button id="homebtn1" onClick={handlesunandaClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img src="arjan dhillon.jpg" id="image1"></img>
          </div>
          <button id="homebtn1" onClick={handlearjanClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img src="nimrat khaira logo.jpg" id="image1"></img>
          </div>
          <button id="homebtn1" onClick={handlenimratClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img src="jordan sandhu.jpg" id="image1"></img>
          </div>
          <button id="homebtn1" onClick={handlejordanClick}>
            Play Now
          </button>
        </div>
      </div>

      <h2 id="homeheading1">Top English Artist's playlist</h2>
      <div className="container4">
        <div className="box1">
          <div className="card">
            <img src="ed sheeran.jpg" id="image1"></img>
          </div>
          <button id="homebtn1" onClick={handleEdsheeranClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img src="dua lipa.jpg" id="image1"></img>
          </div>
          <button id="homebtn1" onClick={handleDualipaClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img src="justin bieber.jpg" id="image1"></img>
          </div>
          <button id="homebtn1" onClick={handleJustinbieberClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img src="olivia rodrigo.jpg" id="image1"></img>
          </div>
          <button id="homebtn1" onClick={handleOliviarodrigoClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img src="sam smith.jpg" id="image1"></img>
          </div>
          <button id="homebtn1" onClick={handleSamsmithClick}>
            Play Now
          </button>
        </div>
      </div>

      <div className="container5">
        <h1 id="heading1">
          <span>Listen</span>&nbsp;to new music.
        </h1>
        <p className="paragraph">
          Music is a universal language that transcends boundaries and connects
          people from all walks of life. It has the power to evoke emotions,
          tell stories, inspire creativity, and create unforgettable moments.
        </p>

        <div className="container6">
          <button id="btn4">Punjabi Songs</button>
          <button id="btn5">English Songs</button>
        </div>
      </div>
      <div className="container7">
        <h1 id="heading1">
          <span>Feel</span>&nbsp;the Rhythm
        </h1>
        <p className="paragraph">
          Music is more than just sound; it's an expression of emotion and
          culture that resonates with people across the globe. Music has the
          ability to transport us to different times, evoke memories, and even
          change our mood.
        </p>

        <div className="container6">
          <button id="btn4">Trending Tracks</button>
          <button id="btn5">New Releases</button>
        </div>
      </div>
      <div className="container8">
        <img src="mobile headphone logo.jpg" id="image8"></img>
      </div>
      <div className="container9">
        <img src="music play logo.jpg" id="image9"></img>
      </div>
      <hr id="hr2"></hr>
      <Footer />
    </>
  );
};

export default Home;
