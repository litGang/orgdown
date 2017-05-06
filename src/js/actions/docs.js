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

export function addDocs() {
  return function (dispatch) {
    db.nodes.insert({ title: 'New Document', conetnt: "markdown" }, function (err, newDoc) {
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

export function loadCurrentDoc() {
  return function(dispatch) {

  }
}
