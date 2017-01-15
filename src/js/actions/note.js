export const INDEX_SELECT = 'INDEX_SELECT';
export const NOTE_LOAD_SUCCESS = 'NOTE_LOAD_SUCCESS';
export const LOAD_NOTE = 'LOAD_NOTE';
export const NODE_CHANGE = 'NODE_CHANGE';
export const CHANGE_DIRECTORY = 'CHANGE_DIRECTORY';
import { Router, hashHistory as history } from "react-router";
import db from "../../../main/database";

export function loadNotes(sort) {
	return function (dispatch) {
		db.docs.find().sort({ createdAt: -1 }).exec(function (err, docs) {
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

export function viewNode(_id) {
	return function (dispatch) {
		db.nodes.findOne({ _id: _id }).exec(function (err, node) {
			dispatch({
				type: LOAD_NOTE,
				data: node
			});
		});
	}
}

export function pushSelection(selection) {
	history.push('note');
}

export function loadItem(index, _id) {
	return function (dispatch) {
		pushSelection(_id);
		db.docs.findOne({ docs: _id }).exec(function (err, note) {
			dispatch({
				type: LOAD_NOTE,
				data: note
			});
		});
	}
}

export function chageDirectory(repoId, sort) {
	return function (dispatch) {
		db.nodes.find({ parent: repoId }).sort({type: -1}).exec(function (err, nodes) {
			dispatch({
				type: CHANGE_DIRECTORY,
				data: nodes
			});
		});
	}
}

export function nodeChange(node) {
	return function (dispatch) {
		db.nodes.update({_id: node._id}, node, function () {
            dispatch({
				type: NODE_CHANGE,
				data: node
			});
        });
	}
}