import db from '../config/db';
export const LOAD_DOCS = 'LOAD_DOCS';
export const SELECT_DOC = 'SELECT_DOC';

export function loadDocs() {
  return function (dispatch) {
    db.nodes.find({}).sort({ createdAt: -1 }).exec(function (err, data) {
      dispatch({ type: LOAD_DOCS, data: data });
      dispatch({ type: SELECT_DOC, data: null });
    })
  }
}

export function addDocs(type) {
  return function (dispatch) {
    db.nodes.insert({ title: 'New Document', conetnt: type, type: type }, function (err, newDoc) {
      if (err) return;
      db.nodes.find({}).sort({ createdAt: -1 }).exec(function (err, data) {
        dispatch({ type: LOAD_DOCS, data: data });
        dispatch({ type: SELECT_DOC, data: newDoc });
      })
    })
  }
}

export function selectDoc(doc) {
  return function (dispatch) {
    dispatch({
      type: SELECT_DOC,
      data: doc
    })
  }
}

export function deleteNote(note) {
  return function (dispatch) {
    db.nodes.remove({ _id: note._id }, function (err, data) {
      db.nodes.find({}).sort({ createdAt: -1 }).exec(function (err, data) {
        dispatch({ type: LOAD_DOCS, data: data });
        dispatch({ type: SELECT_DOC, data: null });
      })
    })
  }
}

export function loadCurrentDoc() {
  return function (dispatch) {

  }
}
