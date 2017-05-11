import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer as routing } from "react-router-redux";

import nodeReducer from './reducers/nodeReducer';
import docReducer from './reducers/docReducer';

export default compose(
  applyMiddleware(thunk)
)(createStore)(combineReducers({ nodeReducer, docReducer }));
