// @flow
export const INIT_NOTEBOOK = 'INIT_NOTEBOOK';
export const ADD_NOTEBOOK = 'ADD_NOTEBOOK';
export const UPDATE_NOTEBOOK = 'UPDATE_NOTEBOOK';
export const SELECT_NOTE = 'SELECT_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

export const SELECT_DOC = 'SELECT_DOC';
export const GET_DOCS_IN_NOTE = 'GET_DOCS_IN_NOTE';

import {selectDoc} from './docs';
import db from "../../main/database";

export function addNotebook(notebook) {
    return (dispatch) => {
        if (notebook._id) {
            db.notebooks.update({_id: notebook._id}, notebook, function (err, data) {
                dispatch({
                    type: UPDATE_NOTEBOOK,
                    data: notebook
                });
            })
        } else {
            db.notebooks.insert({text: notebook.text}, function (err, data) {
                dispatch({
                    type: ADD_NOTEBOOK,
                    data: data
                });
            })
        }
    }
}

export function selectNote(note) {
    // db.notebooks.update({currentNotebook: note});
    return {
        type: SELECT_NOTE,
        data: note
    };

}

export function deleteNote(note) {
    return (dispatch) => {
        db.notebooks.remove({_id: note._id}, function (err, data) {
            dispatch({
                type: DELETE_NOTE,
                data: note
            })
        })
    }
}

function getDocsInNote(docs) {
    return (dispatch) => {
        db.config.findOne({key: 'currentDoc'}, function (err, data) {
            docs.map((doc) => {
                if (data.value == doc._id) {
                    dispatch(selectDoc(doc));
                }
            });
            dispatch({
                type: GET_DOCS_IN_NOTE,
                data: docs
            })
        })
    }
}

export function initNotebook(notes) {
    return {
        type: INIT_NOTEBOOK,
        data: notes
    }
}

export function selectNotebook(note) {
    return (dispatch, getState) => {
        if (getState().currentNotebook._id == note._id) return;
        db.config.update({key: 'currentNote'}, {
            key: 'currentNote',
            value: note._id
        }, {upsert: true}, function (err, data) {
            dispatch(selectNote(note));
            let filter = note._id == 'allNote' ? {} : {noteId: note._id};
            db.docs.find(filter).sort({ createdAt: -1 }).exec( function (err, docs) {
                dispatch(getDocsInNote(docs));
            });
        });
    }
}