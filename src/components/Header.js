//logo, burger menu, icon to show if logged in
//insert material ui icon, import library and in import section

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../assets/binoculars.png";
import Register from "../screen/Register";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { AuthContext } from "../context/authContext";
const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const logOut = () => {
    setUser(null);
  };

  return (
    <div className="headersection">
      <nav className="navigationfield">
        {/* <p>logo</p> */}
        <ColorLensIcon className="icon" color="primary" />
        <h1>
          <Link to="/">Home</Link>
        </h1>
        {/* <h1>
          <Link to="/details">Details</Link>
        </h1> */}
        <h1>
          <Link to="/login">Login</Link>
        </h1>
        {/* <h1>
          <Link to="/register">Register</Link>
        </h1> */}
        <h1>
          <Link to="/gallery">Gallery</Link>
        </h1>
        <p>
          {user && (
            <button onClick={logOut} type="submit" className="btn btn-primary">
              LogOut
            </button>
          )}
        </p>
        <h1>{user && <h2>{user.email}</h2>}</h1>
      </nav>
    </div>
    //  </Wrapper>
  );
};

export default Header;
