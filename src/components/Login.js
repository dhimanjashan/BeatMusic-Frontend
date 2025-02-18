import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Login = () => {
  const navigate = useNavigate();
  const handleReset = (e) => {
    e.preventDefault();
    navigate("/reset");
  };

  return (
    <>
      <div className="wrapper">
        <div className="login-container">
          <h2>Welcome Back!</h2>
          <form action="#" method="POST">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <p className="forgot-password">
              Forgot your password?{" "}
              <a onClick={handleReset} href="/reset">
                Reset here
              </a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
