import React, { act, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const Navbar = ({ activeLink, setActiveLink }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (link, path) => {
    setActiveLink(link);
    navigate(path);
    setMenuOpen(false);
  };
  return (
    <>
      <nav className="navbar">
        <h1>
          <span>Beat</span>Music
        </h1>
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          &#9776;
        </div>
        <ul className={menuOpen ? "nav-links show" : "nav-links"}>
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
        {/* <div className={menuOpen ? "nav-links show" : "nav-links"}> */}
          <div className="container2">
            <Link
              to="/help"
              id="btn1"
              onClick={() => handleNavigation("help", "/help")}
              className={activeLink === "help" ? "active" : ""}
            >
              Help
            </Link>
            <hr className="hr" />
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
          </div>
              </ul>
        {/* </div> */}
      </nav>
    </>
  );
};

export default Navbar;
