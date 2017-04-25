import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import note from './reducers/note';
import { routerReducer as routing } from "react-router-redux";

export default compose(
  applyMiddleware(thunk)
)(createStore)(combineReducers({ routing, note }));
