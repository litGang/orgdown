// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP
import {LOAD_NOTE} from "../actions/actions";

const initialState = {
	note: undefined
};

const handlers = {

	[LOAD_NOTE]: (state, action) => {
		return action.data;
	}
};

export default function noteReducer(state = initialState, action) {
	let handler = handlers[action.type];
	if (!handler) return state;
	return {...state, ...handler(state, action)};
}
