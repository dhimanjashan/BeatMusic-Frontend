import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const CreateAccount = ({ setActiveLink }) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    setActiveLink("login");
    navigate("/login");
  };

  return (
    <>
      <div className="accountContainer1">
        <h1 id="createAccountheading1">Hanji Sohneyo Bnalo Apna New Account</h1>
      </div>
      <hr className="accountHr"></hr>
      <div className="accountContainer2">
        <div className="accountContainer3">
          <h1 className="createAccountheading2">Create Account</h1>
          <h3 className="createAccountheading3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="createAccountheading4"
              onClick={handleNavigation}
            >
              Login
            </Link>
          </h3>
          <div className="accountContainer4">
            <input type="string" placeholder="First Name"></input>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <button className="createAccountbtn">Sign up</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
CreateAccount.propTypes = {
  handlePlayPause: PropTypes.func.isRequired,
};
export default CreateAccount;
