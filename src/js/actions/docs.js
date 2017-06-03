import db from '../common/db';
export const LOAD_DOCS = 'LOAD_DOCS';
export const SELECT_DOC = 'SELECT_DOC';

export function loadDocs(nodeId, docId) {
  return function (dispatch) {
    let filter = {}
    if (nodeId) {
      filter.nodeId = nodeId
    }
    db.docs.find(filter).sort({ createdAt: -1 }).exec(function (err, data) {
      dispatch({ type: LOAD_DOCS, data: data, docId: docId });
    })
  }
}

export function addDocs(type, nodeId) {
  console.log("AddDoc:", nodeId)
  return function (dispatch) {
    db.docs.insert({ title: 'New Document', conetnt: type, type: type, nodeId: nodeId }, function (err, newDoc) {
      if (err) return;
      db.docs.find({ nodeId: nodeId }).sort({ createdAt: -1 }).exec(function (err, data) {
        dispatch({ type: LOAD_DOCS, data: data });
        dispatch({ type: SELECT_DOC, data: newDoc });
      })
    })
  }
}

export function selectDoc(doc) {
  return function (dispatch) {
    localStorage.docId = doc._id
    dispatch({ type: SELECT_DOC, data: doc })
  }
}

export function deleteNote(note) {
  return function (dispatch) {
    db.docs.remove({ _id: note._id }, function (err, data) {
      db.docs.find({}).sort({ createdAt: -1 }).exec(function (err, data) {
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
