//logo, burger menu, icon to show if logged in
//insert material ui icon, import library and in import section

import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../assets/binoculars.png";

const Header = () => {
  return (
    /* <Wrapper>
       
    <LogoWrapper>
    <img src={'src/assets/icons8-binoculars-80 (1).png alt="Logo"'} />;
    
    <LogoWrapper/> 
  
       <HomePageButton></HomePageButton/>
       <SearchWrapper>
       <SearchBarWrapper>
       </SearchBarWrapper>
       <SearchWrapper/>
       <IconsWrapper> install materialUI </IconsWrapper/>
       </Wrapper>
*/

    <div classname="headersection">
      <nav className="navigationfield">
        <p>logo</p>
        <h1>
          <Link to="/">Home</Link>
        </h1>
        <h1>
          <Link to="/details">Details</Link>
        </h1>
        <h1>
          <Link to="/login">Login</Link>
        </h1>
        <h1>
          <Link to="/gallery">Gallery</Link>
        </h1>
        <h1>
          <Link to="/list">List</Link>
        </h1>
      </nav>
    </div>
    //  </Wrapper>
  );
};

export default Header;

/* import styled components doesn't show*/
