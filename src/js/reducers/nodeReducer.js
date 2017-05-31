import { LOAD_NOTE, SELECT_NODE } from "../actions";

const initialState = {
  nodes: [],
  currentNode: undefined
};

const handlers = {

  [LOAD_NOTE]: (state, action) => {
    let currentNode = action.data.filter((item) => {
      return item.isSelected
    })
    // let currentNode = state.currentNode || action.data[0]
    return { nodes: action.data, currentNode: currentNode[0] };
  },

  [SELECT_NODE]: (state, action) => {
    let targetNode = action.data
    let currentNode;
    var newState = state.nodes.map((node) => {
      if (targetNode._id === node._id) {
        currentNode = node
      }
      return node;
    });
    return { nodes: newState, currentNode: currentNode };
  }
};

export default function nodeReducer(state = initialState, action) {
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
}
