import { createStore } from "redux";
import combineReducers from "../reducers/index";

export let store = createStore(combineReducers);

