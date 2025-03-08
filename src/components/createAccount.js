import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import AlertModal from "./AlertModal"; // Import custom alert


const CreateAccount = ({ setActiveLink }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [passwordLength, setpasswordLength] = useState(0);
  const [alertTitle, setalertTitle] = useState('');
  const [alertMessage, setalertMessage] = useState('');


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
      setFormData({ ...formData, password: value });
      setpasswordLength(value.length);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload
   if(passwordLength<6){
      setalertTitle("🔒 Password Length Error");
    setalertMessage("Password must be at least 6 characters long");
    setShowModal(true);
      // alert("Password must be at least 6 characters long");
      return;
   }
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
        setShowModal(true);
        setalertTitle("🎉 Welcome Aboard!");
        setalertMessage(" ✅ Your account has been successfully created. Get ready to explore and enjoy all the features! 🚀");
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
  const handleConfirm = () => {
    setShowModal(false);
  }

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
              className="custom-input" required
            ></input>
            <input
              name="email"
              onChange={handleChange}
              value={formData.email} // Controlled input
              type="email"
              placeholder="Email"
              className="custom-input" required
            ></input>
            <input
              name="password"
              onChange={handleChange}
              value={formData.password} // Controlled input 
              type="password"
              placeholder="Password"
              className="custom-input" required
            ></input>
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
          />
        )}
      </div>
      <Footer />
    </>
  );
};
CreateAccount.propTypes = {
  handlePlayPause: PropTypes.func.isRequired,
};
export default CreateAccount;
