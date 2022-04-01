import React from "react";
import { Link } from "react-router-dom";
import Challenge from "./Challenge";
import FriendsList from "./FriendsList";
import Lesson from "./Lesson";
import "./main.css";
import Proggress from "./Proggress";
import TopTen from "./TopTen";

const Main = () => {
  const tiles = [
    {
      name: "Proggress",
      component: <Proggress />,
    },
    {
      name: "Friends Score List",
      component: <FriendsList />,
    },
    {
      name: "Top 10 of a month",
      component: <TopTen />,
    },
    {
      name: "Continue a lesson",
      component: <Lesson />,
    },
    {
      name: "Monthly challenge",
      component: <Challenge />,
    },
  ];

  const categoryOptions = [
    { name: "Training", URL: "/test" },
    { name: "Learning", URL: "/lesson" },
    { name: "Games", URL: "/game" },
  ];
  return (
    <div className="main">
      <div className="categories">
        <div className="categories__options">
          {categoryOptions.map((option) => (
            <Link to={option.URL} key={option.name}>
              <button className="categories__options--button">
                {option.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <div className="tiles">
        {tiles.map((tile) => (
          <div className="tile__container" key={tile.name}>
            {tile.component}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Main;
