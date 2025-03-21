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
import PartySongs from "./components/PartySongs";
import RoadSongs from "./components/RoadSongs";
import WeddingSongs from "./components/WeddingSongs";
import GamingSongs from "./components/GamingSongs";
import PunjabiMusic from "./components/PunjabiMusic";
import MusicApp from "./components/Music";
import Reset from "./components/Reset";
import Heart from "./components/Heart";
import ShowFavourite from "./components/ShowFavourite";
import User from "./components/User";
import AlertModal from "./components/AlertModal";
import UserDetails from "./components/UserDetails";

function App() {
  const [image, setImage] = useState("");
  const [activeLink, setActiveLink] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <Router>
      <Navbar
        activeLink={activeLink}
        setActiveLink={setActiveLink}
        isNavOpen={isNavOpen}
        setIsNavOpen={setIsNavOpen}
        toggleNav={toggleNav}
      />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Home setActiveLink={setActiveLink} isNavOpen={isNavOpen} />
            }
          />
          <Route
            exact
            path="/newmusic"
            element={<Newmusic isNavOpen={isNavOpen} />}
          />
          <Route exact path="/amrindergill" element={<AmrinderGill />} />
          <Route
            exact
            path="/nimratkhaira"
            element={<NimratSongs isNavOpen={isNavOpen} />}
          />
          <Route exact path="/playmusic" element={<PlayerControl />} />
          <Route
            exact
            path="/favourite"
            element={<Favourite isNavOpen={isNavOpen} />}
          />
          <Route
            exact
            path="/about"
            element={<About isNavOpen={isNavOpen} />}
          />
          <Route
            exact
            path="/login"
            element={<Login isNavOpen={isNavOpen} />}
          />
          <Route
            exact
            path="/reset"
            element={<Reset isNavOpen={isNavOpen} />}
          />
          <Route exact path="/help" element={<Help isNavOpen={isNavOpen} />} />
          <Route exact path="/heart" element={<Heart />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/partySongs" element={<PartySongs />} />
          <Route exact path="/gamingSongs" element={<GamingSongs />} />
          <Route exact path="/roadSongs" element={<RoadSongs />} />
          <Route exact path="/weddingSongs" element={<WeddingSongs />} />
          <Route exact path="/alertModal" element={<AlertModal />} />
          <Route
            exact
            path="/showFavourite"
            element={<ShowFavourite setActiveLink={setActiveLink} />}
          />
          <Route exact path="/punjabimusic" element={<PunjabiMusic />} />
          <Route exact path="/englishsongs" element={<EnglishSongs />} />
          <Route exact path="/trendingsongs" element={<TrendingSongs />} />
          <Route
            exact
            path="/userDetails"
            element={<UserDetails setActiveLink={setActiveLink} />}
          />
          <Route
            exact
            path="/musiclist"
            element={<Musiclist image={image} />}
          />
          <Route
            exact
            path="/createAccount"
            element={
              <CreateAccount
                setActiveLink={setActiveLink}
                isNavOpen={isNavOpen}
              />
            }
          />
          <Route exact path="/musicapp" element={<MusicApp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
