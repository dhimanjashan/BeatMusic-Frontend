import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import AlertModal from "./AlertModal";

const CreateAccount = ({ setActiveLink, isNavOpen }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [passwordLength, setpasswordLength] = useState(0);
  const [alertTitle, setalertTitle] = useState("");
  const [alertMessage, setalertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [userEmail, setuserEmail] = useState("");

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
    const { name, value } = e.target;
    if (name === "password") {
      setShowIcon(value.length > 0);
    }
    if (name === "email") {
      setuserEmail(value);
    }

    if (name === "password") {
      setFormData({ ...formData, password: value });
      setpasswordLength(value.length);
    }
    setFormData({ ...formData, [name]: value });
  };

  function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
    if (passwordLength < 6) {
      setalertTitle("🔒 Password Length Error");
      setalertMessage(
        "Password must be at least 6 characters long or fill the pending details"
      );
      setShowModal(true);
      return;
    }
    if (isValidEmail(userEmail)) {
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
        const json = await response.json();

        if (response.ok) {
          localStorage.setItem("token", json.authtoken);
          setShowModal(true);
          setalertTitle("🎉 Welcome Aboard!");
          setalertMessage(
            " ✅ Your account has been successfully created. Get ready to explore and enjoy all the features! 🚀"
          );
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
    } else {
      setalertTitle("Invalid Email ❌");
      setalertMessage("Please enter a valid email address.");
      setShowModal(true);
      return;
    }
  };
  const handleConfirm = () => {
    setShowModal(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div
        className={
          isNavOpen ? "accountContainer1 blur-background" : "accountContainer1"
        }
      >
        <h1 id="createAccountheading1">Start Your Journey – Sign Up Now 🌟</h1>
      </div>
      <hr className="accountHr"></hr>
      <div
        className={
          isNavOpen ? "accountContainer2 blur-background" : "accountContainer2"
        }
      >
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
              required
            ></input>
            <input
              name="email"
              onChange={handleChange}
              value={formData.email} // Controlled input
              type="email"
              placeholder="Email"
              className="custom-input"
              required
            ></input>
            <div className="accountpassword-container">
              <input
                name="password"
                onChange={handleChange}
                value={formData.password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="custom-input"
                required
                id="password-input"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showIcon && (
                  <i
                    className={
                      showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                )}
              </span>
            </div>

            <button onClick={handleSubmit} className="createAccountbtn">
              Sign up
            </button>
          </div>
        </div>
        {showModal && (
          <AlertModal
            title={alertTitle}
            message={alertMessage}
            onConfirm={handleConfirm}
            confirmText="OK"
            type="success"
          />
        )}
      </div>
      <Footer isNavOpen={isNavOpen} />
    </>
  );
};
CreateAccount.propTypes = {
  handlePlayPause: PropTypes.func.isRequired,
};
export default CreateAccount;
