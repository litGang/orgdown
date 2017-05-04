import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer as routing } from "react-router-redux";

import nodes from './reducers/nodes';
import docs from './reducers/docs';

export default compose(
  applyMiddleware(thunk)
)(createStore)(combineReducers({ nodes, docs }));
