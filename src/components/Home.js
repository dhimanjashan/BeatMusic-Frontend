import React from "react";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { actionCreator } from "../state/index.js";
import Footer from "./Footer";

const Home = ({ setImage, setActiveLink }) => {
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
  const handleloginNaviagtion = () => {
    setActiveLink("newmusic");
    navigate("/newmusic");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <h2 id="homeheading1">Top Punjabi Artist's playlist</h2>
      <div className="container3">
        <div className="box1">
          <div className="card">
            <img
              src="Amrinder Gill.jpg"
              id="image1"
              onClick={handleamrinderClick}
            ></img>
          </div>
          <button id="homebtn1" onClick={handleamrinderClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img
              src="sunanda sharma.png"
              id="image1"
              onClick={handlesunandaClick}
            ></img>
          </div>
          <button id="homebtn1" onClick={handlesunandaClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img
              src="arjan dhillon.jpg"
              id="image1"
              onClick={handlearjanClick}
            ></img>
          </div>
          <button id="homebtn1" onClick={handlearjanClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img
              src="nimrat khaira logo.jpg"
              id="image1"
              onClick={handlenimratClick}
            ></img>
          </div>
          <button id="homebtn1" onClick={handlenimratClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img
              src="jordan sandhu.jpg"
              id="image1"
              onClick={handlejordanClick}
            ></img>
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
            <img
              src="ed sheeran.jpg"
              id="image1"
              onClick={handleEdsheeranClick}
            ></img>
          </div>
          <button id="homebtn1" onClick={handleEdsheeranClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img
              src="dua lipa.jpg"
              id="image1"
              onClick={handleDualipaClick}
            ></img>
          </div>
          <button id="homebtn1" onClick={handleDualipaClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img
              src="justin bieber.jpg"
              id="image1"
              onClick={handleJustinbieberClick}
            ></img>
          </div>
          <button id="homebtn1" onClick={handleJustinbieberClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img
              src="olivia rodrigo.jpg"
              id="image1"
              onClick={handleOliviarodrigoClick}
            ></img>
          </div>
          <button id="homebtn1" onClick={handleOliviarodrigoClick}>
            Play Now
          </button>
        </div>
        <div className="box1">
          <div className="card">
            <img
              src="sam smith.jpg"
              id="image1"
              onClick={handleSamsmithClick}
            ></img>
          </div>
          <button id="homebtn1" onClick={handleSamsmithClick}>
            Play Now
          </button>
        </div>
      </div>
      <div className="bigContainer">
        <div className="container5">
          <h1 id="heading1">
            <span>Listen</span>&nbsp;to new music
          </h1>
          <p className="paragraph">
            Rabindranath Tagore: “Music fills the infinite between two souls. It
            has its origin in the unseen, and it moves us in ways beyond words.
            The melodies we cherish are not just sounds but echoes of the
            emotions and dreams that live within us. Music is the purest form of
            art, and bringing harmony to the world.”
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

        <div className="midContainer">
          <h1 id="heading1">
            <span>Power</span>&nbsp;of Music
          </h1>
          <p className="paragraph">
            Sarojini Naidu: "Music is the voice of the soul, the unspoken poetry
            of the heart that transcends time and space. It is the gentle
            whisper of the breeze, the rhythmic dance of raindrops, and the
            eternal song of the universe. In its melody, the burdens of life are
            lightened, and in its harmony, the spirit finds peace. Just as a
            bird sings without reason, so does music flow freely."
          </p>
        </div>

        <div className="container7">
          <h1 id="heading1">
            <span>Feel</span>&nbsp;the Rhythm
          </h1>
          <p className="paragraph">
            A. R. Rahman: "Music is not just a sound; it is an experience that
            connects souls. It has the power to heal, to bring joy, and to
            inspire change. A single melody can evoke a thousand emotions, and a
            simple rhythm can unite people beyond borders. It is the language of
            the heart, spoken and understood by all."
          </p>

          <div className="container6">
            <button
              id="btn4"
              onClick={() => handleSimpleNavigation("/trendingsongs")}
            >
              Trending Songs
            </button>
            <button id="btn5" onClick={() => handleloginNaviagtion()}>
              New Releases
            </button>
          </div>
        </div>
      </div>
      <div className="homeLastDiv"></div>
      <Footer />
    </>
  );
};

export default Home;
