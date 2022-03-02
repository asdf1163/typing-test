import React, { useRef, useState } from "react";
import "./navbar.css";
import { FaHeart, FaUserCircle } from "react-icons/fa";
import TokenImage from "../media/images/token.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const iconSize = 40;

  const inputRef = useRef<HTMLInputElement>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const searchText = (event: React.FormEvent) => {
    event.preventDefault();
    inputRef.current?.blur();
    console.log("search bar doesn't work yet");
  };

  const userMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">
          <div>LOGO</div>
        </Link>
      </div>
      <div className="navbar__search">
        <form onSubmit={searchText}>
          <input
            type="text"
            ref={inputRef}
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
          <img
            src={TokenImage}
            height={iconSize}
            width={iconSize}
            alt="token"
          />
        </div>
        <div className="user__profile" onClick={userMenu}>
          <FaUserCircle size={iconSize} title={"asdf"} />
          {openMenu && (
            <div className="user__menu" onBlur={userMenu}>
              <ul>
                <li>Profile</li>
                <li>Settings</li>
                <li onClick={() => console.log("nie działa")}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
