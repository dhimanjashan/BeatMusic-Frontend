import "./App.css";
import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Newmusic from "./components/Newmusic";
import Favourite from "./components/Favourite";
import About from "./components/About";
import Help from "./components/Help";
import PlayerControl from "./components/PlayerControl";
import Musiclist from "./components/Musiclist";
import CreateAccount from "./components/createAccount";
import AmrinderGill from "./components/AmrinderGill";
import NimratSongs from "./components/NimratSongs";
import EnglishSongs from "./components/EnglishSongs";
import TrendingSongs from "./components/TrendingSongs";
import PunjabiMusic from "./components/PunjabiMusic";
import PlayerSystem from "./components/PlayerSystem";
import MusicApp from "./components/Music";

function App() {
  const [heading, setHeading] = useState("");
  const [image, setImage] = useState("");
  const [music, setMusic] = useState("");
  const [audio, setAudio] = useState("");
  const [isPlaying, setisPlaying] = useState(false);
  const [favouriteTitle, setFavouriteTitle] = useState(null);
  

  return (
    <Router>
      <Navbar />
      <div className="container">
        
        <Routes>
          <Route
            path="/"
            element={<Home setImage={setImage} setMusic={setMusic} />}
          />
          <Route exact path="/newmusic" element={<Newmusic />} />
          <Route
            exact
            path="/amrindergill"
            element={<AmrinderGill setAudio={setAudio} />}
          />
          <Route
            exact
            path="/nimratkhaira"
            element={<NimratSongs setisPlaying={setisPlaying} />}
          />
          <Route
            exact
            path="/playmusic"
            element={<PlayerControl audio={audio} />}
          />
          <Route
            exact
            path="/favourite"
            element={<Favourite />}
          />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/help" element={<Help />} />
          <Route exact path="/punjabimusic" element={<PunjabiMusic />} />
          <Route exact path="/englishsongs" element={<EnglishSongs />} />
          <Route exact path="/trendingsongs" element={<TrendingSongs />} />
          <Route
            exact
            path="/musiclist"
            element={<Musiclist image={image} music={music} />}
          />
          <Route exact path="/createAccount" element={<CreateAccount />} />
          <Route exact path="/musicapp" element={<MusicApp favouriteTitle={favouriteTitle} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
