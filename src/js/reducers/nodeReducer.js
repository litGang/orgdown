import { LOAD_NOTE } from "../actions";

const initialState = {
  nodes: []
};

const handlers = {

  [LOAD_NOTE]: (state, action) => {
    return { nodes: action.data };
  }
};

export default function nodeReducer(state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
