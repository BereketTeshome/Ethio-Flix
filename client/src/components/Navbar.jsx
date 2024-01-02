import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode, MdOutlineLogout } from "react-icons/md";
import Cookie from "universal-cookie";
import * as jwt from "jwt-decode";
import { IoMenu, IoHome, IoSearch } from "react-icons/io5";
import { BiMoviePlay } from "react-icons/bi";
import { PiTelevisionBold } from "react-icons/pi";

const Navbar = ({ toggleTheme }) => {
  const [toggle, setToggle] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const cookie = new Cookie();
  const token = cookie.get("token");
  const username = token && jwt.jwtDecode(token).username;
  const userId = token && jwt.jwtDecode(token).userId;
  const [pop, setPop] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setToggleSidebar(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleLogout = () => {
    try {
      cookie.remove("token");
      navigate("/");
      setPop(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
    toggleTheme();
  };
  const handlePop = () => {
    setPop(!pop);
  };
  const handleSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <>
      <div className="navbar">
        <div className="nav-links">
          <li className="menu-btn">
            <IoMenu size={38} onClick={() => handleSidebar()} />
          </li>
          <h2>
            Ethio<span>Flix</span>
          </h2>
          <ul>
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/tvshows">TV-SHOW</NavLink>
            </li>
            <li>
              <NavLink to="/movies">MOVIES</NavLink>
            </li>
            <li>
              <NavLink to="/search">SEARCH</NavLink>
            </li>
            <li className="toggle-btn" onClick={() => handleToggle()}>
              {toggle ? <MdDarkMode size={19} /> : <MdLightMode size={19} />}
            </li>
          </ul>
        </div>
        <div className="nav-right">
          {!token && (
            <Link to={`/login`} className="login-btn">
              SIGN IN
            </Link>
          )}
          {username && (
            <button className="user-btn" onClick={() => handlePop()}>
              {username && username.slice(0, 2)}
            </button>
          )}
        </div>
        {pop && (
          <div className="dropdown">
            <Link to="/favorites">
              <button>
                <p>Favorites</p>
              </button>
            </Link>
            <Link to="/reviews">
              <button>
                <p>Reviews</p>
              </button>
            </Link>
            <Link to={`/updateProfile/${userId}`}>
              <button>
                <p>Edit Password</p>
              </button>
            </Link>
            <button onClick={handleLogout}>
              <p>
                <MdOutlineLogout className="logout-icon" /> Logout
              </p>
            </button>
          </div>
        )}
      </div>
      {/* ////////////// SIDE BAR ////////////// */}
      <div
        ref={menuRef}
        className={
          toggleSidebar ? "sidebar blur-sidebar" : "sidebar hide-sidebar"
        }
      >
        <h1>
          Ethio<span>Flix</span>
        </h1>
        <h2>MENU</h2>

        <ul>
          <NavLink to="/" className="sidebar-link">
            <li>
              <IoHome /> HOME
            </li>
          </NavLink>

          <NavLink to="/tvshows" className="sidebar-link">
            <li>
              <PiTelevisionBold /> TV-SHOW
            </li>
          </NavLink>

          <NavLink to="/movies" className="sidebar-link">
            <li>
              <BiMoviePlay /> MOVIES
            </li>
          </NavLink>

          <NavLink to="/search" className="sidebar-link">
            <li>
              <IoSearch /> SEARCH
            </li>
          </NavLink>

          <h2>THEME</h2>
          <div style={{ cursor: "pointer" }}>
            {toggle ? (
              <li onClick={() => handleToggle()}>
                <MdDarkMode size={19} /> Dark Mode
              </li>
            ) : (
              <li onClick={() => handleToggle()}>
                <MdLightMode size={19} />
                Light Mode
              </li>
            )}
          </div>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
