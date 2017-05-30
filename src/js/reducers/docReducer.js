import { LOAD_DOCS, SELECT_DOC } from "../actions";

const initialState = {
  docs: [],
  currentDoc: undefined
};

const handlers = {

  [LOAD_DOCS]: (state, action) => {
    return { docs: action.data };
  },

  [SELECT_DOC]: (state, action) => {
    let targetDoc = action.data
    let currentDoc;
    var newState = state.docs.map((doc) => {
      doc.active = false
      if (targetDoc._id === doc._id) {
        currentDoc = doc
        doc.active = true;
      }
      return doc;
    });

    return { docs: newState, currentDoc: currentDoc };
  }
};

export default function docReducer(state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
