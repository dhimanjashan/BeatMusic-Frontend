import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import AlertModal from "./AlertModal";

const Reset = () => {
  const navigate = useNavigate();
  const [alertTitle, setalertTitle] = useState("");
  const [alertMessage, setalertMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [passwordLength, setpasswordLength] = useState(0);

  const [data, setData] = useState({
    email: "",
    newpassword: "",
    reenternewpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "newpassword") {
      setData({ ...data, newpassword: value });
      setpasswordLength(value.length);
    }
    setData({ ...data, [name]: value });
  };

  const handleReset = async (e) => {
    e.preventDefault(); // Prevent form reload
    if (passwordLength < 6) {
      setalertTitle("🔒 Password Length Error");
      setalertMessage("Password must be at least 6 characters long");
      setShowModal(true);
      return;
    }
    try {
      const response = await fetch("http://172.20.10.4:5000/api/users/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const fetchedData = await response.json();

      if (response.ok) {
        setShowModal(true);
        setalertTitle("🔐 Password Changed!");
        setalertMessage(
          "✅ Your password has been reset! You can now log in with your new credentials."
        );

        setData({
          email: "",
          newpassword: "",
          reenternewpassword: "",
        });
      } else {
        alert(fetchedData.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleConfirm = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="wrapper">
        <div className="reset-container">
          <h2>Reset Password</h2>
          <p className="resetHeading">
            Enter your email to reset your password.
          </p>
          <form>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                value={data.email}
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="newpassword">Enter New Password</label>
              <input
                value={data.newpassword}
                type="password"
                id="newpassword"
                name="newpassword"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="reenternewpassword">Re-Enter New Password</label>
              <input
                value={data.reenternewpassword}
                type="password"
                id="reenternewpassword"
                name="reenternewpassword"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="reset-button"
              onClick={handleReset}
            >
              Reset Password
            </button>
            <p className="back-to-login">
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Back to Login
              </a>
            </p>
          </form>
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
      <Footer />
    </>
  );
};

export default Reset;
