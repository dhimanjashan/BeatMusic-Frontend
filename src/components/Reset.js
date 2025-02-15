import React from "react";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const navigate = useNavigate();

  const handleBackLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <>
      <div class="wrapper">
        <div class="reset-container">
          <h2>Reset Password</h2>
          <p className="resetHeading">
            Enter your email to receive a password reset link.
          </p>
          <form action="#" method="POST">
            <div class="input-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>
            <button type="submit" class="reset-button">
              Send Reset Link
            </button>
            <p class="back-to-login">
              <a href="/login" onClick={handleBackLogin}>
                Back to Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Reset;
