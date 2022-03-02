import { Dispatch } from "redux";
import { userTypes } from "./userType";
import { Actions } from "./userInterface/interfaceUserReducer";

export const successUserData = (userData: any) => {
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

function setCookie(columnName: string, columnValue: any) {
  return document.cookie = `${columnName}=${columnValue}; expires=${setExpireTimeCookie(daysToExpire)}`;
}

export const checkUserValidationLogin = (username:object) => {
  return (dispatch: Dispatch<Actions>) => {
      setCookie('username', username)
      setCookie('isLogged', true)
      dispatch(successUserData(username))
  }
};
