//logo, burger menu, icon to show if logged in
//insert material ui icon, import library and in import section

import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Header = () => {
  return (
    /* <Wrapper>
       <LogoWrapper<LogoWrapper/>
       <HomePageButton></HomePageButton/>
       <SearchWrapper>
       <SearchBarWrapper>
       </SearchBarWrapper>
       <SearchWrapper/>
       <IconsWrapper> install materialUI </IconsWrapper/>
       </Wrapper>
*/

    <div>
      <nav className="navigationfield">
        <h1>
          <h1>Logo</h1>
        </h1>
        <h1>
          <Link to="/">Home</Link>
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
        <input
          type="text"
          tabIndex="1"
          placeholder="search"
          // onChange={(e) => onFilter(e.target.value)}
        ></input>
        <button /*onClick={displayRandomArt}*/>random</button>
      </nav>
    </div>
    //  </Wrapper>
  );
};

export default Header;
