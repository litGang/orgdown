import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import route from './reducers/route';
import nav from './reducers/nav';
import note from './reducers/note';
import index from './reducers/index';
import sketch from './reducers/sketch';
import node from './reducers/node';
import {routerReducer as routing} from "react-router-redux";

export default compose(
	applyMiddleware(thunk)
)(createStore)(combineReducers({nav, routing, note, index, sketch, node}));
