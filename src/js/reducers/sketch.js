// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP
import {INIT_EDITOR} from "../actions/actions";

const initialState = {
	sketch: undefined
};

const handlers = {

	[INIT_EDITOR]: (state, action) => {
		return action.data;
	}
};

export default function noteReducer(state = initialState, action) {
	let handler = handlers[action.type];
	if (!handler) return state;
	return {...state, ...handler(state, action)};
}
