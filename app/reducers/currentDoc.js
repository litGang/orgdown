// @flow
import initState from './initState';

export default function currentDoc(state: Object = initState.currentDoc, action: Object) {
    switch (action.type) {
        case 'SELECT_DOC':
            return Object.assign({}, action.data);
        case 'CHANGE_DOC_TITLE':
            return Object.assign({}, state, {
                title: action.data
            });
        case 'ADD_DOC':
            return action.data.doc;
        case 'DOC_CHANGED':
            // console.log(action.data);
            return action.data;
        default:
            return state;
    }
}
