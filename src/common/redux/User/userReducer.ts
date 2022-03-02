import { userTypes } from "./userType";
import { Actions, IinitialState } from "./userInterface/interfaceUserReducer";

const initialState: IinitialState = {
  isLoggedIn: false,
  userData: {},
  error: "",
};

export const userReducer = (state = initialState, action: Actions): object => {
  switch (action.type) {
    case userTypes.SUCCESS_USER_DATA:
      return {
        isLoggedIn: true,
        userData: action.payload,
        error: ''
      };
    case userTypes.FAILED_USER_DATA:
      return {
        isLoggedIn: false,
        userData: [],
        error: action.payload,
      };

    default:
      return state;
  }
};
