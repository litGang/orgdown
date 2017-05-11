import db from '../common/db';
export const LOAD_NOTE = 'LOAD_NOTE';
export const ADD_NOTEBOOK = 'ADD_NOTEBOOK';

export function loadNotes(sort) {
  return function (dispatch) {
    // db.nodes.insert({label: "china", parentId: "BxlcUfWAW23wknew", iconName: "folder-close"})
    db.nodes.find({}, function (err, data) {
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
