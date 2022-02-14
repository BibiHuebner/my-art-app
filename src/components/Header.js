//todo: login logout I am missing something, logout link in header doesn't

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../App.css";
//import "../assets/binoculars.png";
//import Register from "../screen/Register";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppLogo from "./AppLogo";
import { AuthContext } from "../context/authContext";
const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const logOut = () => {
    setUser(null);
  };

  return (
    <div className="headersection">
      <nav className="navigationfield">
        <AppLogo />
        {/* <ColorLensIcon className="icon" color="primary" sx={{ fontSize: 40 }} /> */}
        <h1>
          <Link className="link" to="/">
            Home
          </Link>
        </h1>

        {/* {user ? (
          <h1>
            <Link to="/logOut">Logout</Link>
          </h1>
        ) : (
          <h1>
            <Link to="/login">Login</Link>
          </h1>
        )} */}

        <h1>
          {!user && (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
        </h1>
        {/* <h1>{user && <Link to="/logOut">Logout</Link>}</h1> */}
        <h1>
          {user && (
            <Link className="link" to="/gallery">
              Gallery
            </Link>
          )}
        </h1>
        {/* //use the avatar to logout without button? if yes, needs hover  */}
        {/* <p>
          {user && (
            <button onClick={logOut} type="submit" className="btn btn-primary">
              LogOut
            </button>
          )}
        </p> */}
        <div>
          {user && (
            <AccountCircleIcon
              sx={{ fontSize: 40 }}
              onClick={logOut}
              type="submit"
              className="userAvatar"
            />
          )}
          <div class="hide">log out</div>
        </div>
        {/* <h2>{user.email}</h2> new: display user icon instead of email*/}
      </nav>
    </div>
  );
};

export default Header;
