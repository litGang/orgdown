import db from '../common/db';
export const LOAD_DOCS = 'LOAD_DOCS';
export const SELECT_DOC = 'SELECT_DOC';

export function loadDocs(node) {
  return function (dispatch) {
    let filter = {}
    if (node) {
      filter.nodeId = node._id
    }
    db.docs.find(filter).sort({ createdAt: -1 }).exec(function (err, data) {
      dispatch({ type: LOAD_DOCS, data: data });
    })
  }
}

export function addDocs(type, nodeId) {
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
    db.docs.update({}, { $set: { active: false } }, { multi: true }, function (err, numReplaced) {
      db.docs.update({ _id: doc._id }, { $set: { active: true } }, { multi: false }, function (err, numReplaced) {
        dispatch({ type: SELECT_DOC, data: doc })
      })
    })
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
