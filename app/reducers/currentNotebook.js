// @flow
// import {SELECT_NOTE, ADD_NOTEBOOK} from "../actions/note";
import initState from './initState';

export default function currentNotebook(state: Object = initState.currentNotebook, action: Object) {
    switch (action.type) {
        case 'SELECT_NOTE':
            let newState = Object.assign({}, action.data);
            newState.selected = true;
            return newState;
        default:
            return state;
    }
}
