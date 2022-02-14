//to do: clean up login logout and error messages

import React, { useState, useContext } from "react";
//import Container from "react-bootstrap/Container";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import Button from "react-bootstrap/Button";
import { AuthContext } from "../context/authContext";
import ColorLensIcon from "@mui/icons-material/ColorLens";
//import { Logout } from "@mui/icons-material";

const Login = () => {
  const { user, setUser, logIn } = useContext(AuthContext);
  const history = useHistory();
  const handleLogin = () => {
    logIn(email, password);
    history.push("/gallery");
  };
  const logOut = () => {
    setUser(null);
  };
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [passwordError, setpasswordError] = useState("");
  // //remove errors validation
  // const [emailError, setemailError] = useState("");
  // const handleValidation = (event) => {
  //   let formIsValid = true;

  //   if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
  //     formIsValid = false;
  //     setemailError("Email Not Valid");
  //     return false;
  //   } else {
  //     setemailError("");
  //     formIsValid = true;
  //   }

  //   if (!password.match(/^[a-zA-Z]{8,22}$/)) {
  //     formIsValid = false;
  //     setpasswordError("Only letters, length must be min 8 Chracters");
  //     return false;
  //   } else {
  //     setpasswordError("");
  //     formIsValid = true;
  //   }

  //   return formIsValid;

  const loginSubmit = (e) => {
    e.preventDefault();
    //handleValidation();
  };

  return (
    // <div>

    //   {/* <button onClick={logIn}>Login</button> */}
    <div className="App">
      <div className="LogContainer">
        {/* //text align: center, display flex+ justify content: center */}
        {/* <ColorLensIcon sx={{ fontSize: 40 }} color="#47484b" /> */}
        <h3 className="userInfo">Login to save your favorites</h3>
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={loginSubmit}>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
                {/* <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small> */}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                {/* <small id="passworderror" className="text-danger form-text">
                  {passwordError} */}
                {/* </small> */}
              </div>

              {user ? (
                <button
                  onClick={logOut}
                  type="submit"
                  className="btn btn-secondary"
                >
                  LogOut
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  type="submit"
                  className="btn btn-secondary"
                >
                  Login
                </button>
              )}
              <Link className="link" to="/register">
                <p className="forgot-password text-right">
                  Not yet registered?
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
