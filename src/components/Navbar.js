import React from "react";
import { useNavigate, Link } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handleClickHome = (e) => {
    e.preventDefault();
    navigate("/");
  };
  const handleClickNewmusic = (e) => {
    e.preventDefault();
    navigate("/newmusic");
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const handlefavourite = (e) => {
    e.preventDefault();
    navigate("/favourite");
  };
  const handleabout = (e) => {
    e.preventDefault();
    navigate("/about");
  };
  const handleclickhelp = (e) => {
    e.preventDefault();
    navigate("/help");
  };
  const handlecreateAccount = (e) => {
    e.preventDefault();
    navigate("/createAccount");
  };

  return (
    <>
      <nav className="navbar">
        <h1>
          <span>Beat</span>Music
        </h1>
        <ul>
          <li>
            <Link to="/" onClick={handleClickHome}>
              Home
            </Link>
          </li>
          <li>
            <a href="/newmusic" onClick={handleClickNewmusic}>
              New music
            </a>
          </li>
          <li>
            <a href="/favourite" onClick={handlefavourite}>
              Favourite
            </a>
          </li>
          <li>
            <a href="/about" onClick={handleabout}>
              About
            </a>
          </li>
        </ul>
        <div className="container2">
          <a href="/help" id="btn1" onClick={handleclickhelp}>
            Help
          </a>
          <hr className="hr" />
          <a href="/login" id="btn2" onClick={handleLoginClick}>
            Login
          </a>
          <button id="btn3" onClick={handlecreateAccount}>
            Create an account
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
