import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Cookie from "universal-cookie";
import * as jwt from "jwt-decode";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const UpdateUser = ({ toggleTheme }) => {
  const cookie = new Cookie();
  const token = cookie.get("token");
  const navigate = useNavigate();
  const userId = token && jwt.jwtDecode(token).userId;
  const [password, setPassword] = useState("");

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `https://ethio-flix-server.vercel.app/api/user/update/${userId}`,
        {
          password,
        }
      );
      navigate("/");
      setTimeout(() => {
        toast.success("PASSWORD UPDATED!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            width: "340px",
            position: "relative",
            right: "90px",
          },
        });
      }, 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ minHeight: "76vh" }}>
      <Navbar toggleTheme={toggleTheme} />

      <div className="update-container">
        <h2>Update Password</h2>
        <span className="underline"></span>

        <div className="update-input">
          <input
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => handleUpdate()} disabled={!password}>
            Update
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateUser;
