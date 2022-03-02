import React, { useState, useRef } from "react";
import style from "./uservalidation.module.css";
import { FaDiscord, FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import LoginForm from "./login/LoginForm";
import SignupForm from "./singup/SignupForm";
import { IloginForm, IsignupForm } from "./interfaceUserValidation";

interface IselectedOption {
  choice: "login" | "signup";
}

const UserValidation = () => {
  const [selectedOption, setSelectedOption] =
    useState<IselectedOption["choice"]>("login");
  const activityElementsRef = useRef<HTMLHeadingElement>(null);
  const iconSize = 35;

  const [loginForm, setLoginForm] = useState<IloginForm>({
    username: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState<IsignupForm>({
    username: "",
    password: "",
    email: "",
  });

  const handleSelectedOption = (choice: IselectedOption["choice"]) => {
    setSelectedOption(choice);
  };

  const buttonOptions = {
    activeButton: `${style["activity__button"]} ${style["activity__button--active"]}`,
    defaultButton: `${style["activity__button"]}`,
  };

  return (
    <div className={style.page}>
      <div className={style.box}>
        <div className={style.box__container}>
          <div className={style["box__container--logo"]}>LOGO</div>
          <div
            className={style["box__container--activity"]}
            ref={activityElementsRef}
          >
            <button
              onClick={() => handleSelectedOption("login")}
              className={
                selectedOption === "login"
                  ? buttonOptions.activeButton
                  : buttonOptions.defaultButton
              }
            >
              LOG IN
            </button>
            <button
              onClick={() => handleSelectedOption("signup")}
              className={
                selectedOption === "signup"
                  ? buttonOptions.activeButton
                  : buttonOptions.defaultButton
              }
            >
              SIGN UP
            </button>
          </div>
          {selectedOption === "login" ? (
            <LoginForm loginForm={loginForm} setLoginForm={setLoginForm} />
          ) : (
            <SignupForm signupForm={signupForm} setSignupForm={setSignupForm} />
          )}

          <div className={style["box__container--auth"]}>
            <FaDiscord size={iconSize} />
            <FaGoogle size={iconSize} />
            <FaFacebook size={iconSize} />
            <FaTwitter size={iconSize} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserValidation;
