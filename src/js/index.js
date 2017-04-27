import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { HashRouter } from 'react-router-dom';
import store from './store';

import Orgdown from './containers/Orgdown';
import '../style/app.global.scss'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Orgdown />
      </Provider>
    )
  }
}

ReactDOM.render((
  <App />
), document.getElementById('application'));
