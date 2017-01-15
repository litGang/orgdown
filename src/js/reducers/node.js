// orgdown 2017-01-15
import {CHANGE_DIRECTORY} from "../actions/actions";

const initialState = {
	data: undefined
};

const handlers = {

	[CHANGE_DIRECTORY]: (state, action) => ({
		data: action.data
	}),
};

export default function noteReducer(state = initialState, action) {
	let handler = handlers[action.type];
	if (!handler) return state;
	return {...state, ...handler(state, action)};
}
