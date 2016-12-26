// @flow
// import {SELECT_NOTE, ADD_NOTEBOOK} from "../actions/note";

import initState from './initState';

export default function notebooks(state: Object = initState.notes, action: Object) {
    switch (action.type) {
        case 'INIT_NOTEBOOK':
            return action.data;
        case 'ADD_NOTEBOOK':
            return [...state, action.data];
        case 'DELETE_NOTE':
            return state.filter((note) => {
                return note._id != action.data._id
            });
        case 'UPDATE_NOTEBOOK':
            let newState = Object.assign([], state);
            newState.map((notebook) => {
                if (notebook._id == action.data._id) {
                    Object.assign(notebook, action.data);
                }
                return notebook;
            });
            return newState;
        default:
            return state;
    }
}
