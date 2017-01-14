// @flow
import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./containers/App";
import NewHome from "./components/NewHome";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={NewHome}/>
    </Route>
);
