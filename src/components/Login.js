import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { login } from "../state/authSlice";
import { setUserID } from "../state/userSlice";
import { fetchFavorites } from "../state/favouriteSlice";
import AlertModal from "./AlertModal";

const Login = ({ isNavOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    navigate("/reset");
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const { value } = e.target;
    setShowIcon(value.length > 0);
  };
  const handleConfirm = () => {
    setShowModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload

    try {
      const response = await fetch("http://172.20.10.4:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // const data = await response.json();
      const json = await response.json();

      if (response.ok) {
        localStorage.setItem("auth-token", json.authtoken);
        const decodedToken = JSON.parse(atob(json.authToken.split(".")[1])); // Decode JWT
        console.log("Decoded Token:", decodedToken); // ✅ Debugging

        if (!decodedToken.user || !decodedToken.user.id) {
          console.error("Invalid token structure:", decodedToken);
          return;
        }
        dispatch(fetchFavorites(decodedToken.user.id));
        localStorage.setItem("userId", decodedToken.user.id);
        dispatch(setUserID(decodedToken.user.id));
        dispatch(login());
        // Clear input fields after submission
        setFormData({
          email: "",
          password: "",
        });
        navigate("/showFavourite");
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className={isNavOpen ? "wrapper blur-background" : "wrapper"}>
        <div className="login-container">
          <h2>Welcome Back!</h2>
          <form action="#" method="POST">
            <div className="input-group">
              <label htmlFor="username">Email</label>
              <input
                value={formData.email}
                onChange={handleChange}
                type="email"
                id="username"
                name="email"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="loginpassword-container">
                <input
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  type={showPassword ? "text" : "password"}
                  required
                  id="password-input"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showIcon && ( // Show the eye icon only when input has text
                    <i
                      className={
                        showPassword
                          ? "fa-solid fa-eye-slash"
                          : "fa-solid fa-eye"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                    ></i>
                  )}
                </span>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="login-button"
            >
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
        {showModal && (
          <AlertModal
            title="Check Credentials"
            message="⚠️ Oops! The credentials you entered don’t match our records. Please double-check and try again. 🔄 If you haven't created an account yet, sign up first! ✨"
            onConfirm={handleConfirm}
            confirmText="OK"
          />
        )}
      </div>
      <Footer isNavOpen={isNavOpen} />
    </>
  );
};

export default Login;
