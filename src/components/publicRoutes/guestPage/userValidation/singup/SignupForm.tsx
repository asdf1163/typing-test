import axios from "axios";
import React from "react";
import { IsignupForm } from "../interfaceUserValidation";
import style from "./signup.module.css";

interface IsignupProps {
  signupForm: IsignupForm;
  setSignupForm: any;
}

const SignupForm = ({ signupForm, setSignupForm }: IsignupProps) => {
  const changeOptions = {
    changeValue: function (name: string, value: any) {
      setSignupForm((prevState: any) => ({
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
    email: function (value: string) {
      this.changeValue("email", value);
    },
  };

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/users/signup", signupForm)
      .then((data) => {
        console.log(data);
        console.log("Data send successfully");
      })
      .catch((error) => console.log(error));
  };

  return (
    <form className={style["box__container--form"]} onSubmit={handleSumbit}>
      <input
        type={"text"}
        placeholder={"Username"}
        onChange={(e) => changeOptions.username(e.target.value)}
        value={signupForm.username}
      />
      <input
        type={"password"}
        placeholder={"Password"}
        onChange={(e) => changeOptions.password(e.target.value)}
        value={signupForm.password}
      />
      <input
        type={"email"}
        placeholder={"E-mail"}
        onChange={(e) => changeOptions.email(e.target.value)}
        value={signupForm.email}
      />
      <span className={style.policyInformation}>
        By clicking Sign Up, you agree to our Terms and Cookies Policy.
      </span>
      <button type={"submit"}> Sign up </button>
    </form>
  );
};

export default SignupForm;
