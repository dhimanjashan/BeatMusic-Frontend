import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import User from "./User";
import { useSelector } from "react-redux";

const Navbar = ({ activeLink, setActiveLink }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleNavigation = (link, path) => {
    setActiveLink(link);
    navigate(path);
    setMenuOpen(false);
  };
  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar" ref={navRef}>
        <div className={menuOpen ? "nav-links show" : "musicHeading"}>
          <h1 className="navbarMusicHeading">
            <span>Beat</span>Music
          </h1>
        </div>
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </div>
        <div className={`nav-overlay ${menuOpen ? "open" : ""}`} ref={navRef}>
          <button className="close-btn" onClick={() => setMenuOpen(false)}>
            &times;
          </button>
          <ul className={menuOpen ? "nav-links show" : "nav-links"}>
            <div className="container2">
              <li>
                <Link
                  to="/"
                  onClick={() => handleNavigation("home", "/")}
                  className={activeLink === "home" ? "active" : ""}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/newmusic"
                  onClick={() => handleNavigation("newmusic", "/newmusic")}
                  className={activeLink === "newmusic" ? "active" : ""}
                >
                  New music
                </Link>
              </li>
              <li>
                <Link
                  to="/favourite"
                  onClick={() => handleNavigation("favourite", "/favourite")}
                  className={activeLink === "favourite" ? "active" : ""}
                >
                  Favourite
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => handleNavigation("about", "/about")}
                  className={activeLink === "about" ? "active" : ""}
                >
                  About
                </Link>
              </li>
              <Link
                to="/help"
                id="btn1"
                onClick={() => handleNavigation("help", "/help")}
                className={activeLink === "help" ? "active" : ""}
              >
                Help
              </Link>
              <hr className={menuOpen ? "nav-links show" : "hr"} />
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    id="btn2"
                    onClick={() => handleNavigation("login", "/login")}
                    className={activeLink === "login" ? "active" : ""}
                  >
                    Login
                  </Link>
                  <button
                    id="btn3"
                    onClick={() =>
                      handleNavigation("createaccount", "/createaccount")
                    }
                  >
                    Create an account
                  </button>
                </>
              ) : (
              <User/>
              )}
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
