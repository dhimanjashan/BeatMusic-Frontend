import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator } from "../state/index.js";

const Home = ({ setImage, setartistHeading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headline = useSelector((state) => state.heading);
  const { artistHeadline } = bindActionCreators(actionCreator, dispatch);

  const handleamrinderClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("amrinder-gill.jpg");
    artistHeadline("Hanji Shoneyo Suniye Song Amrinder Gill De 🎵");
  };
  const handlesunandaClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("sunanda-sharma.jpg");
    artistHeadline("Hanji Shoneyo Suniye Song Sunanda Sharma De 🎵");
  };
  const handlearjanClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("arjan-dhillon.jpg");
    artistHeadline("Hanji Shoneyo Suniye Song Arjan Dhillon De 🎵");
  };
  const handlenimratClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("nimrat-khaira.jpg");
    artistHeadline("Hanji Shoneyo Suniye Song Nimrat Khaira De 🎵");
  };
  const handlejordanClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("jordan-sandhu.jpg");
    artistHeadline("Hanji Shoneyo Suniye Song Jordan Sandhu De 🎵");
  };
  const handleEdsheeranClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("Ed-sheeran-cropped.jpg");
    artistHeadline("Here is the list of Ed Sheeran Songs 🎵");
  };
  const handleDualipaClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("dua-lipa-cropped.jpg");
    artistHeadline("Here is the list of Dua Lipa Songs 🎵");
  };
  const handleJustinbieberClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("justin-bieber-cropped.webp");
    artistHeadline("Here is the list of Justin Bieber Songs 🎵");
  };
  const handleOliviarodrigoClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("olivia-rodrigocropped.jpg");
    artistHeadline("Here is the list of Olivia Rodrigo Songs 🎵");
  };
  const handleSamsmithClick = (e) => {
    e.preventDefault();
    navigate("/musiclist");
    setImage("sam-smith-cropped.jpg");
    artistHeadline("Here is the list of Sam Smith Songs 🎵");
  };

  const handleSimpleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
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
          <button
            id="btn4"
            onClick={() => handleSimpleNavigation("/punjabimusic")}
          >
            Punjabi Songs
          </button>
          <button
            id="btn5"
            onClick={() => handleSimpleNavigation("/englishsongs")}
          >
            English Songs
          </button>
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
          <button
            id="btn4"
            onClick={() => handleSimpleNavigation("/trendingsongs")}
          >
            Trending Songs
          </button>
          <button id="btn5" onClick={() => handleSimpleNavigation("/newmusic")}>
            New Releases
          </button>
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
