import {combineReducers} from "redux";
import {userReducer} from "./reduser";
import {transactionsReducer} from "./transactionsReduser";
import {familyReducer} from "./authReduser";

export default combineReducers({
    userReducer,
    transactionsReducer,
    familyReducer
});

