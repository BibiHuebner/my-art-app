//save a clicked item in a favorites list
import React, { useContext } from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { AuthContext } from "../context/authContext";

const Gallery = () => {
  const { user, setUser, logIn } = useContext(AuthContext);
  console.log("user", user);
  return (
    <div className="gallery">
      <ColorLensIcon className="logo" color="primary" />
      <h2>save your favorites here. Log in to have access to your gallery</h2>
    </div>
  );
};

export default Gallery;
