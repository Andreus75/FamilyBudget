import {combineReducers} from "redux";
import {userReducer} from "./reduser";
import {transactionsReducer} from "./transactionsReduser";

export default combineReducers({
    userReducer,
    transactionsReducer
})
