// @flow
// import {SELECT_NOTE, ADD_NOTEBOOK} from "../actions/note";
import initState from './initState';

export default function docs(state: Object = initState.docs, action: Object) {
    switch (action.type) {
        case 'GET_DOCS_IN_NOTE':
            return action.data;
        case 'DOC_CHANGED':
            let newState = Object.assign([], state);
            newState.map((doc) => {
                if (doc._id == action.data._id) {
                    Object.assign(doc, action.data);
                }
            });
            return newState;
        case 'ADD_DOC':
            return Object.assign([], [action.data.doc, ...state]);
        case 'DELETE_DOC':
            return state.filter((doc) => {
                return doc._id != action.data._id;
            });
        default:
            return state;
    }
}
