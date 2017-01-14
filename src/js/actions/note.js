export const INDEX_SELECT = 'INDEX_SELECT';
export const NOTE_LOAD_SUCCESS = 'NOTE_LOAD_SUCCESS';
export const LOAD_NOTE = 'LOAD_NOTE';
import {Router, hashHistory as history} from "react-router";
import db from "../../../main/database";

export function loadNotes(sort) {
    return function(dispatch) {
		db.docs.find().sort({ createdAt: -1 }).exec( function (err, docs) {
		    dispatch({
				type: NOTE_LOAD_SUCCESS,
				data: {
					docs: docs,
					sort: sort
				    }
			});
	    });
	}
}

export function selectNote(index, _id) {
    return function(dispatch) {
	if (typeof index === 'string') {
	    index = {config: {path: index}};
	}
	pushSelection(index, _id);
	db.docs.findOne({_id: _id}).exec( function (err, note) {
	    dispatch({
		type: LOAD_NOTE,
		data: note
	    });
	});
    }
}

export function pushSelection(selection) {
    history.push('note');
}

export function loadItem(index, _id) {
    return function(dispatch) {
	pushSelection(_id);
	db.docs.findOne({docs: _id}).exec( function (err, note) {
	    dispatch({
		type: LOAD_NOTE,
		data: note
	    });
	});
    }
}