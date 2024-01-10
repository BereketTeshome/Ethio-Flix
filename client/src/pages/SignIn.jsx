import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const navigate = useNavigate();
  const cookie = new Cookie();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "https://ethio-flix-server.vercel.app/api/user/login",
        {
          username,
          password,
        }
      );
      if (res.data.token) {
        setUsernameErr(true);
        cookie.set("token", res.data.token);
        navigate("/");
      } else {
        setUsernameErr(res.data.error);
        setTimeout(() => {
          setUsernameErr("");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <img src="../../public/sm.jpg" alt="login-image" />
        </div>
        <div className="login-right">
          <h2 style={{ marginBottom: "80px" }}>Login</h2>
          <form>
            <input
              type="username"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className={
                usernameErr.length > 3
                  ? "login-form-input inputError"
                  : "login-form-input"
              }
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              className={
                usernameErr ? "login-form-input inputError" : "login-form-input"
              }
            />
            {usernameErr && <p>{usernameErr}</p>}
            <button
              type="submit"
              onClick={(e) => {
                handleLogin(e);
              }}
            >
              Login
            </button>
            <Link to="/signUp">don't have an account?</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
