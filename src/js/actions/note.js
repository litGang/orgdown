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

export function addNotebook(noteName, node) {
  return function (dispatch) {
    db.nodes.insert({label: noteName, parentId: node._id, iconName: 'folder-close'}, function(err, newNote) {
      loadNotes()
    })
  }
}
