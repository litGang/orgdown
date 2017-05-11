import React from 'react';
import { connect } from 'react-redux'

import CodeEditor from './editor/CodeEditor'
import MyTree from './MyTree'

import { loadCurrentDoc } from '../actions'

class MindWork extends React.Component {

  render() {
    let { currentDoc } = this.props;
    // return <MyTree />
    return currentDoc ? <CodeEditor doc={currentDoc} /> : <div>No Selected Item</div>
  }
}

let select = (state) => ({
  currentDoc: state.docReducer.currentDoc
})
export default connect(select)(MindWork);
