import { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import firebase from "../firebase-config";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user", user);
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log("errorMessage", errorMessage);
      });
  };
  const logIn = (email, password) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/invalid-email") {
          setError("Email not valid");
        } else if (errorCode == "auth/invalid-password") {
          setError(
            "Password not valid. It must be a string with at least six characters"
          );
        }
      });
  };
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
      })

      .catch((error) => {
        // An error happened.
      });
  };
  const checkUser = () => {
    //do I need the getauth?
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        setUser(null);
        // ...
      }
    });
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, logIn, logout, register, error }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
