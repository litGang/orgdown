import * as React from "react";

import { Provider } from "react-redux";
import { HashRouter } from 'react-router-dom';
import store from "./store";

import Orgdown from './components/Orgdown';
import '../style/app.global.css'

export default () => (
  <Provider store={store}>
      <Orgdown />
  </Provider>
);
