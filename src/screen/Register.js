import React, { useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import Button from "react-bootstrap/Button";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "../firebase-config";
import { AuthContext } from "../context/authContext";
import { Link, useHistory } from "react-router-dom";

//<form id="loginform" onSubmit={loginSubmit}>
const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const handleEmailChange = (e) => {
    // console.log("e.target", e.target);
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    // console.log("e.target", e.target);
    setPassword(e.target.value);
  };
  const handleRegisterClick = (event) => {
    event.preventDefault();
    register(email, password);
    console.log("(email,password)", (email, password));
  };
  const auth = getAuth();
  //the following is now in authcontext:
  const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..

        console.log("errorMessage", errorMessage);
      });
  };
  return (
    <div className="App">
      <div className="container">
        <ColorLensIcon color="primary" />
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform">
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="text"
                  className="form-control"
                  id="EmailInput"
                  name="EmailInput"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {/* <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small> */}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {/* <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small> */}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleRegisterClick}
              >
                Register
              </button>
              <Link to="/login">
                Already registered?
                <p className="forgot-password text-right"></p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
