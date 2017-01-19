import React from "react";
import {Provider} from "react-redux";
import {Router, hashHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import {routes} from "./Routes";
import store from "./store";

import '../style/app.global.css'

const history = syncHistoryWithStore(hashHistory, store);

export default () => (
	<Provider store={store}>
		<Router routes={routes} history={history}/>
	</Provider>
);