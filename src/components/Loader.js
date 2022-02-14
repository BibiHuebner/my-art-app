import React from "react";
import ColorLensIcon from "@mui/icons-material/ColorLens";

const Loader = () => {
  return <ColorLensIcon className="spinner" />;
};

export default Loader;

// .svgLoader {
//       animation: spin 0.5s linear infinite;
//       margin: auto;
//     }
//     .divLoader {
//       width: 100vw;
//       height: 100vh;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       z-index: 9999;
//     }
//     @keyframes spin {
//       0% { transform: rotate(0deg); }
//       100% { transform: rotate(360deg); }
//     }
