import React from "react";
import { postUsertDataSignup } from "../../../../../common/apis/userApi";
import { IsignupForm } from "../interfaceUserValidation";
import style from "./signup.module.css";

interface IsignupProps {
  signupForm: IsignupForm;
  setSignupForm: React.Dispatch<React.SetStateAction<IsignupForm>>;
}

const SignupForm = ({ signupForm, setSignupForm }: IsignupProps) => {
  const changeOptions = {
    changeValue: function (name: string, value: string) {
      setSignupForm((prevState: IsignupForm) => ({
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
    const decide = checkDataValidation(signupForm);
    console.log("data is ready to send: ", !decide.includes(true));
    if (!decide.includes(true))
      postUsertDataSignup(signupForm)
        .then((data) => {
          console.log(data);
          console.log("Data send successfully");
        })
        .catch((error) => console.log(error));
  };

  const checkDataValidation = (signupForm: IsignupForm) => {
    return Object.keys(signupForm).map(
      (data: string) => signupForm[data] === ""
    );
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
