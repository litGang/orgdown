export const INDEX_SELECT = 'INDEX_SELECT';
export const NOTE_LOAD_SUCCESS = 'NOTE_LOAD_SUCCESS';
export const LOAD_NOTE = 'LOAD_NOTE';
export const NODE_CHANGE = 'NODE_CHANGE';
export const CHANGE_DIRECTORY = 'CHANGE_DIRECTORY';
// import { Router, hashHistory as history } from "react-router";
// import db from "../../electron/database";

export function loadNotes(sort) {
	return function (dispatch) {
			dispatch({
				type: NOTE_LOAD_SUCCESS,
				data: {
					sort: sort
				}
			});
	}
}
