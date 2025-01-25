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
import PunjabiSongs from "./components/punjabiSongs";
import EnglishSongs from "./components/EnglishSongs";
import TrendingSongs from "./components/TrendingSongs";

function App() {
  const [heading, setHeading] = useState("");
  const [image, setImage] = useState("");
  const [music, setMusic] = useState("");
  const [artistHeading, setartistHeading] = useState("");
  const [audio, setAudio] = useState("");
  const [isPlaying, setisPlaying] = useState(false);

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setImage={setImage}
                setMusic={setMusic}
                setartistHeading={setartistHeading}
              />
            }
          />
          <Route exact path="/newmusic" element={<Newmusic />} />
          <Route exact path="/amrindergill" element={<AmrinderGill />} />
          <Route
            exact
            path="/nimratkhaira"
            element={<NimratSongs setisPlaying={setisPlaying} />}
          />
          <Route exact path="/playmusic" element={<PlayerControl />} />
          <Route
            exact
            path="/favourite"
            element={<Favourite heading={heading} />}
          />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/help" element={<Help />} />
          <Route exact path="/punjabisongs" element={<PunjabiSongs />} />
          <Route exact path="/englishsongs" element={<EnglishSongs />} />
          <Route exact path="/trendingsongs" element={<TrendingSongs />} />
          <Route
            exact
            path="/musiclist"
            element={
              <Musiclist image={image} music={music} artistHeading={artistHeading} />
            }
          />
          <Route exact path="/createAccount" element={<CreateAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
