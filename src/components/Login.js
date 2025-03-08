import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useSelector,useDispatch } from "react-redux";
import { login, logout } from "../state/authSlice";
import { setUserID } from "../state/userSlice";
import { setFavorites } from "../state/favouriteSlice";
import { fetchFavorites } from "../state/favouriteSlice";
import AlertModal from "./AlertModal"; // Import custom alert


const Login = ({setlogged}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  let isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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
  };
  const handleConfirm = () => {
    setShowModal(false);
  }
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
      const data = await response.json();
      if (response.ok) {
        dispatch(fetchFavorites(data.userId));
        console.log("Login successfully!");
        console.log(data.userId);
        dispatch(setUserID(data.userId));
        dispatch(login()); 
        // Clear input fields after submission
        setFormData({
          email: "",
          password: "",
        });
        navigate('/showFavourite');
      } else {
        setShowModal(true);
        // console.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="login-container">
          <h2>Welcome Back!</h2>
          <form action="#" method="POST">
            <div className="input-group">
              <label htmlFor="username">Email</label>
              <input value={formData.email} onChange={handleChange} type="email" id="username" name="email" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input value={formData.password} onChange={handleChange} type="password" id="password" name="password" required />
            </div>
            <button onClick={handleSubmit} type="submit" className="login-button">
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
      <Footer />
    </>
  );
};

export default Login;
