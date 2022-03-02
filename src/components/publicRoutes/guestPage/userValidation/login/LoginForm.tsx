import React, { useState } from "react";
import style from "./login.module.css";
import { useDispatch } from "react-redux";
import { checkUserValidationLogin } from "../../../../../common/redux/User/userAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IloginForm } from "../interfaceUserValidation";

interface IloginProps {
  loginForm: IloginForm;
  setLoginForm: any;
}

const LoginForm = ({ loginForm, setLoginForm }: IloginProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAttemptCorrect, setAttemptCorrect] = useState<boolean>(true);

  const changeOptions = {
    changeValue: function (name: string, value: any) {
      setLoginForm((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    },
    username: function (value: string) {
      this.changeValue("username", value);
    },
    password: function (value: string) {
      this.changeValue("password", value);
    },
  };

  const handleSumbit = async (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/users/login", loginForm)
      .then((result) => {
        checkIfUserExist(result);
        return result;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  function checkIfUserExist(result: any) {
    if (result?.data.length !== 0) {
      dispatch(checkUserValidationLogin({ username: loginForm.username }));
      navigate("/", { replace: true });
    } else {
      setAttemptCorrect(false);
    }
  }

  return (
    <>
      {!isAttemptCorrect && (
        <span className={style["box__container--wrong"]}>
          Something went wrong! Try again
        </span>
      )}
      <form className={style["box__container--form"]} onSubmit={handleSumbit}>
        <input
          type={"text"}
          placeholder={"Username"}
          onChange={(e) => changeOptions.username(e.target.value)}
          value={loginForm.username}
        />
        <input
          type={"password"}
          placeholder={"Password"}
          onChange={(e) => changeOptions.password(e.target.value)}
          value={loginForm.password}
        />
        <button type={"submit"}> Log in </button>
      </form>
    </>
  );
};

export default LoginForm;
