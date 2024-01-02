import React, { useState } from "react";
import axios from "axios";
import Cookie from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const cookie = new Cookie();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("http://localhost:3001/api/user/register", {
        username,
        email,
        password,
      });

      if (!res.data.error) {
        cookie.set("token", res.data.token);
        navigate("/");
        toast.success("Wow so easy!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setUsernameErr(res.data.error);
        setEmailErr(res.response.data.error);
        console.log(res.response.data.error);
        setTimeout(() => {
          setUsernameErr("");
        }, 1000);
      }
    } catch (error) {
      setUsernameErr(error.response.data.error);
      console.log(error);
    }
  };
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-left">
          <img src="/joker2.jpg" alt="signup-image" />
        </div>
        <div className="login-right">
          <h2>Sign Up</h2>
          <form>
            <input
              className={
                usernameErr ? "login-form-input inputError" : "login-form-input"
              }
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />

            <input
              className={
                usernameErr ? "login-form-input inputError" : "login-form-input"
              }
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />

            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className={
                usernameErr ? "login-form-input inputError" : "login-form-input"
              }
            />
            {usernameErr && <p>{usernameErr}</p>}
            {emailErr && <p>{emailErr}</p>}

            <button
              type="submit"
              onClick={(e) => {
                handleRegister(e);
              }}
            >
              Sign Up
            </button>
            <Link to="/login">already have an account?</Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
