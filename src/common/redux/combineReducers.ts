import { combineReducers } from "redux";
import { userReducer } from "./User/userReducer";

const reducers = combineReducers({
    userData: userReducer
})

export default reducers;