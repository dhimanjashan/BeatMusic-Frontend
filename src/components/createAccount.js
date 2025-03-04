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
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    try {
      const response = await fetch(
        "http://172.20.10.4:5000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Data stored successfully!");
        // Clear input fields after submission
        setFormData({
          firstName: "",
          email: "",
          password: "",
        });
      } else {
        console.error("Failed to store data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
            <input
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
              type="string"
              placeholder="First Name"
              className="custom-input"
            ></input>
            <input
              name="email"
              onChange={handleChange}
              value={formData.email} // Controlled input
              type="email"
              placeholder="Email"
              className="custom-input"
            ></input>
            <input
              name="password"
              onChange={handleChange}
              value={formData.password} // Controlled input 
              type="password"
              placeholder="Password"
              className="custom-input"
            ></input>
            <button onClick={handleSubmit} className="createAccountbtn">
              Sign up
            </button>
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
