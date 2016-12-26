// @flow
import {combineReducers} from "redux";
import {routerReducer as routing} from "react-router-redux";
import notebooks from "./note";
import docs from "./docs";
import currentNotebook from "./currentNotebook";
import currentDoc from "./currentDoc";

const rootReducer = combineReducers({
    notebooks,
    docs,
    currentDoc,
    currentNotebook,
    routing
});

export default rootReducer;
