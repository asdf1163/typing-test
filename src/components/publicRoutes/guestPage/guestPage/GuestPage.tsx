import React from "react";
import { Link } from "react-router-dom";
import style from "./guestPage.module.css";

const GuestPage = () => {
  return (
    <div>
      <div className={style.page}>
        <div className={style.navbar}>
          <span className={style.navbar__left}>LOGO</span>
          <span className={style.navbar__right}>
            <Link to="/login">
              <div className={style.login}>
                <button className={style["login--button"]}>LOG IN</button>
              </div>
            </Link>
          </span>
        </div>

        <div className={style.main}>
          <div className={style["main__content--description"]}>
            <h1>Type what you want</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className={style["main__content--image"]}>image</div>
        </div>
      </div>
    </div>
  );
};

export default GuestPage;
