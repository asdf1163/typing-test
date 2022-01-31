import React from "react";
import "./Navbar.css";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import TokenImage from "../media/images/token.svg";

const Navbar = () => {
  const iconSize = 40;

    const searchText = (event: any) => {
        event.preventDefault()
        console.log("search bar doesn't work yet");
    };
    

  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO</div>
      <div className="navbar__search">
        <form onSubmit={(e) => searchText(e)}>
          <input
            type="text"
            className="navbar__search--input"
            placeholder="Find text here..."
          />
        </form>
      </div>
      <div className="navbar__user">
        <div className="user__lives">
          <div className="user__lives--icon">
            <FaHeart size={iconSize} color="red" />
          </div>
          <div className="user__lives--number">5</div>
        </div>
        <div className="user__tokens">
          <p className="user__tokens--amount">4201</p>
          <img src={TokenImage} height={iconSize} width={iconSize} alt="token" />
        </div>
        <div className="user__profile">
          <FaUserCircle size={iconSize} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
