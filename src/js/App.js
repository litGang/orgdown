import * as React from "react";

import { Provider } from "react-redux";
import { HashRouter } from 'react-router-dom';
import store from "./store";

import Notebook from './containers/Notebook';
import '../style/app.global.css'

export default () => (
  <Provider store={store}>
      <Notebook />
  </Provider>
);
