import { LOAD_NOTE } from "../actions";

const initialState = {
  notes: []
};

const handlers = {

  [LOAD_NOTE]: (state, action) => {
    return { notes: action.data };
  }
};

export default function noteReducer(state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
