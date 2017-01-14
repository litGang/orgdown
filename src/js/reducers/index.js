// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP
import {NOTE_LOAD_SUCCESS} from "../actions/actions";

const initialState = {
	sort: 'updatedAt:desc',
	result: {
		items: []
	}
};

const handlers = {

	[NOTE_LOAD_SUCCESS]: (state, action) => ({
		result: {
			sort: action.data.sort,
			items: action.data.docs
		}
	}),

};

export default function dashboardReducer(state = initialState, action) {
	let handler = handlers[action.type];
	if (!handler) return state;
	return {...state, ...handler(state, action)};
};
