import React from "react";
import {Provider} from "react-redux";
import {IntlProvider, addLocaleData} from "react-intl";
import en from "react-intl/locale-data/en";
import {getCurrentLocale, getLocaleData} from "grommet/utils/Locale";
import {Router, hashHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import { sessionInitialize } from './actions/session';
import store from "./store";
import {routes} from "./Routes";
import { routeChanged } from './actions/route';

let locale = getCurrentLocale();
addLocaleData(en);

let messages;
try {
	// rtl driven by hardcoding languages for now
	if ('he' === locale || 'ar' === locale.slice(0, 2)) {
		document.documentElement.classList.add("rtl");
	} else {
		document.documentElement.classList.remove("rtl");
	}
	messages = require('../messages/' + locale);
} catch (e) {
	messages = require('../messages/en-US');
}
let localeData = getLocaleData(messages, locale);

store.dispatch(sessionInitialize(window.location.pathname));

const history = syncHistoryWithStore(hashHistory, store);
// listen for history changes and initiate routeChanged actions for them
history.listen((location) => {
	// const publish = store.getState().session.publishRoute;
	// store.dispatch(routeChanged(location, publish));
});

export default () => (
	<Provider store={store}>
		<IntlProvider locale={localeData.locale} messages={localeData.messages}>
			<Router routes={routes} history={history}/>
		</IntlProvider>
	</Provider>
);