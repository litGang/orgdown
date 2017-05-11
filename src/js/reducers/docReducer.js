import { LOAD_DOCS, SELECT_DOC } from "../actions";

const initialState = {
  docs: [],
  currentDoc: undefined
};

const handlers = {

  [LOAD_DOCS]: (state, action) => {
    let currentDoc = state.currentDoc
    if (!currentDoc) {
      currentDoc = action.data[0];
      currentDoc.active = true;
    }
    return { docs: action.data, currentDoc: currentDoc };
  },

  [SELECT_DOC]: (state, action) => {
    let currentDoc = action.data
    if (!currentDoc) {
      currentDoc = state.docs && state.docs[0]
    }
    var newState = state.docs.map((doc) => {
      doc.active = false
      if (currentDoc._id === doc._id) {
        doc.active = true
      }
      return doc;
    });

    return {docs: newState, currentDoc: currentDoc};
  }
};

export default function docReducer(state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
