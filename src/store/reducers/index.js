import { combineReducers } from "redux";
import { appState } from "./app.reducers";

const reducers = combineReducers({
    sapp: appState
})

export default reducers;
