import { Dispatch } from "redux";
import { userTypes } from "./userType";
import { Actions } from "./userInterface/interfaceUserReducer";
import { IuserProp } from "./userInterface/interfaceUserAction";

export const successUserData = (userData: IuserProp) => {
  return {
    type: userTypes.SUCCESS_USER_DATA,
    payload: userData,
  };
};

export const failedUserData = (error: string) => {
  return {
    type: userTypes.FAILED_USER_DATA,
    payload: error,
  };
};

const daysToExpire = 5

function setExpireTimeCookie(expireDays: number) {
  const currentDate = new Date();
  const dayTime = 1000 * 60 * 60 * 24;
  currentDate.setTime(currentDate.getTime() + expireDays * dayTime);
  return currentDate.toUTCString()
}

function setCookie(columnName: string, columnValue: string | boolean) {
  return document.cookie = `${columnName}=${columnValue}; expires=${setExpireTimeCookie(daysToExpire)}`;
}

export const checkUserValidationLogin = (user: IuserProp) => {
  console.log(user)
  return (dispatch: Dispatch<Actions>) => {
    setCookie('username', user.username)
    setCookie('isLogged', true)
    dispatch(successUserData(user))
  }
};
