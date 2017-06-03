import db from '../common/db';
import { loadDocs } from './docs'

export const LOAD_NOTE = 'LOAD_NOTE';
export const ADD_NOTEBOOK = 'ADD_NOTEBOOK';
export const SELECT_NODE = 'SELECT_NODE';

function loadAndRun(dispatch) {
  db.nodes.find({}, function (err, data) {
    dispatch({ type: LOAD_NOTE, data: data });
  });
}

export function loadNodes(nodeId) {
  return function (dispatch) {
    db.nodes.find({}, function (err, data) {
      dispatch({ type: LOAD_NOTE, data: data, nodeId: nodeId });
    });
  }
}

export function addNotebook(noteName, node) {
  return function (dispatch) {
    db.nodes.insert({ label: noteName, parentId: node._id, iconName: 'folder-close' }, function (err, newNote) {
      loadAndRun(dispatch)
    })
  }
}


export function deleteNotebook(node) {
  return function (dispatch) {
    db.nodes.remove({ _id: node._id }, {}, function (err, numRemoved) {
      loadAndRun(dispatch)
    })
  }
}

export function expandNode(node, state) {
  return function (dispatch) {
    db.nodes.update({ _id: node._id }, { $set: { isExpanded: state } }, { multi: false }, function (err, item) { })
  }
}

export function selectTreeItem(node) {
  return function (dispatch) {
    localStorage.nodeId = node._id
    dispatch(loadDocs(node))
  }
}
