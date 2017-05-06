import db from '../config/db';
export const LOAD_NOTE = 'LOAD_NOTE';
export const ADD_NOTEBOOK = 'ADD_NOTEBOOK';

export function loadNotes(sort) {
  return function (dispatch) {
    db.notebooks.find({}, function (err, data) {
      dispatch({
        type: LOAD_NOTE,
        data: data
      });
    });
  }
}

export function addNotebook(note) {
  return function (dispatch) {
    db.notebooks.find({}, function (err, data) {
      dispatch({
        type: ADD_NOTEBOOK,
        data: data
      });
    });
  }
}
