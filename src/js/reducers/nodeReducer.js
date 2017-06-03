import { LOAD_NOTE, SELECT_NODE } from "../actions";

const initialState = {
  nodes: [],
  currentNode: undefined
};

const handlers = {

  [LOAD_NOTE]: (state, action) => {
    let currentNode;
    action.data.map((item) => {
      if (item._id === action.nodeId) {
        item.isSelected = true
      }
      currentNode = item
    })
    return { nodes: action.data, currentNode: currentNode };
  },

  [SELECT_NODE]: (state, action) => {
    console.log(action.data)
    return { nodes: state.nodes, currentNode: action.data };
  }
};

export default function nodeReducer(state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
