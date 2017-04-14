import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from 'react-router-dom';
import { syncHistoryWithStore } from "react-router-redux";
import store from "./store";

import Orgdown from './components/Orgdown';
import '../style/app.global.css'

// const history = syncHistoryWithStore(hashHistory, store);

export default () => (
  <Provider store={store}>
    <HashRouter basename="/">
      <Orgdown />
    </HashRouter>
  </Provider>
);
