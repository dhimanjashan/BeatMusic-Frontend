import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleSignupBtn = () => {
    navigate("/createAccount");
  };

  return (
    <>
      <div className="Logincontainer">
        <div className="LoginBox1">
          <label>
            <h2 className="Loginheading">Login</h2>
          </label>
        </div>
        <p className="Loginparagraph">Hey, Welcome back to the special place</p>
      </div>
      <img src="Login page logo.avif" className="Loginimage" />

      <div className="LoginBox2">
        <input
          type="text"
          className="Loginusername"
          name="username"
          placeholder="
        Enter your username/Email/Phone Number"
        />
      </div>
      <div className="LoginBox3">
        <input
          type="text"
          className="Loginpassword"
          name="password"
          placeholder="
        Enter your Password"
        />
      </div>
      <div className="Logincheckbox">
        <input type="checkbox" className="agree" name="agree" />
        <label htmlFor="agree">Remember me</label>
        <p className="Loginpara1">Forget Password?</p>
      </div>
      <div className="LoginBox4">
        <button className="Loginbutton">Sign Up</button>
        <p className="Loginpara2">Don't have an account?</p>
        <p className="Loginpara3" onClick={handleSignupBtn}>
          Sign up
        </p>
      </div>
    </>
  );
};

export default Login;
