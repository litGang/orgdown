import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { HashRouter, Route, Switch } from 'react-router-dom'
import store from './store';

import Orgdown from './containers/Orgdown';
import '../style/app.global.scss'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route exact path="/:treeId?/:docId?/:posInfo?" component={Orgdown} />
          </Switch>
        </HashRouter>
      </Provider>
    )
  }
}

ReactDOM.render((
  <App />
), document.getElementById('application'));
