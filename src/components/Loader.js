import React from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";

const Loader = () => {
  return (
    <ColorLensIcon
      className="spinner"
      color="primary"
      sx={{ fontSize: 4000 }}
    />
  );
};

export default Loader;
