import { LOAD_DOCS, SELECT_DOC } from "../actions";

const initialState = {
  items: [],
  currentDoc: undefined
};

const handlers = {

  [LOAD_DOCS]: (state, action) => {
    let currentDoc = state.currentDoc
    if (!currentDoc) {
      currentDoc = action.data[0];
      currentDoc.active = true;
    }
    return { items: action.data, currentDoc: currentDoc };
  },

  [SELECT_DOC]: (state, action) => {
    let currentDoc = action.data
    if (!currentDoc) {
      currentDoc = items[0]
    }
    var newState = state.items.map((doc) => {
      doc.active = false
      if (currentDoc._id === doc._id) {
        doc.active = true
      }
      return doc;
    });

    return {items: newState, currentDoc: currentDoc};
  }
};

export default function noteReducer(state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
