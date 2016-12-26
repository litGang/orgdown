// @flow
export const SELECT_DOC = 'SELECT_DOC';
export const CHANGE_DOC_TITLE = 'CHANGE_DOC_TITLE';
export const DOC_CHANGED = 'DOC_CHANGED';
export const ADD_DOC = 'ADD_DOC';
export const DELETE_DOC = 'DELETE_DOC';

import {remote} from "electron";
const {shell, dialog} = remote;
// import markdown from 'markdown-it';
// var markdownpdf = require("markdown-pdf")
// var urlencode = require('urlencode');
import db from "../../main/database";

// let md = new markdown();

export function selectDoc(doc) {
    return (dispatch, getState) => {
        if (getState().currentDoc._id == doc._id) return;
        db.config.update({key: 'currentDoc'}, {key: 'currentDoc', value: doc._id}, {upsert: true}, function(err, data) {
            dispatch({
                type: SELECT_DOC,
                data: doc
            })
        });
    }
}

export function sendAsEmail(doc) {
    return (dispatch, getState) => {
        let title = getState().currentDoc.title;
        let content = getState().currentDoc.content;
        // content = md.render(content);
        // content = urlencode(content);
		// shell.openExternal(`mailto:?subject= ${title} &body=${content}`);
    }
}

export function exportToPdf(doc) {
    return (dispatch, getState) => {
        let title = getState().currentDoc.title;
        let content = getState().currentDoc.content;

		dialog.showSaveDialog(
			remote.getCurrentWindow(), {
				title: 'ptath'
            }, function(filename) {
			    console.log(filename);
				// markdownpdf().from.string(content).to(filename, function () {
				// 	console.log("Created")
				// })
            }
        )
    }
}

export function addDoc(data) {
    return {
        type: ADD_DOC,
        data: data
    }
}

export function addDoc1() {
    return (dispatch, getState) => {
        let newDoc = {noteId: getState().currentNotebook._id, title: '', content: ''};
        db.docs.insert(newDoc, function (err, data) {
            dispatch(addDoc({
                doc: data,
                currentNotebook: getState().currentNotebook
            }));
        });
    }
}

export function docChanged(curDoc) {
    return {
        type: DOC_CHANGED,
        data: curDoc
    };
}

/**
 * 编辑的文章发生变化，发出动作并更新数据库
 * @param doc
 * @returns {function(*, *)}
 */
export function changeDoc(doc) {
    return (dispatch, getState) => {
        let newDoc = getState().currentDoc;
        Object.assign(newDoc, doc);
        db.docs.update({_id: newDoc._id}, newDoc, function () {
            dispatch(docChanged(newDoc))
        });
    }
}

export function deleteDoc(doc) {
    return (dispatch, getState) => {
        db.docs.remove({_id: doc._id}, function (err, data) {
            dispatch({
                type: DELETE_DOC,
                data: doc
            });
            dispatch(selectDoc({title: '', content: ''}))
        });
    }
}