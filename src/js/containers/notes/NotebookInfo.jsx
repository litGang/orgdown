import React from "react";
import { connect } from 'react-redux';
import { remote } from 'electron';
const { Menu, MenuItem } = remote

import { addDocs } from '../../actions/docs'

class NotebookInfo extends React.Component {

  componentWillReceiveProps(nextProps) {
    // console.log('eaav', nextProps)
  }

  _addNote() {
    let { dispatch, currentNode } = this.props
    const menu = new Menu()
    menu.append(new MenuItem({ label: 'Markdown', click() { dispatch(addDocs('markdown', currentNode._id)) } }))
    menu.append(new MenuItem({ label: 'Asciidoc', click() { dispatch(addDocs('asciidoc', currentNode._id)) } }))
    menu.append(new MenuItem({ label: 'Normal', click() { dispatch(addDocs('normal', currentNode._id)) } }))
    menu.popup(remote.getCurrentWindow())
  }

  render() {
    let { docs, currentNode } = this.props;
    return (
      <div className='orgdown-noteinfo'>
        <div className="sort">
          <span className="pt-icon-standard pt-icon-sort-desc"></span>
        </div>
        <div className="title">
          <b>{(currentNode && currentNode.label) || 'Notebooks'}</b> ({docs.length})
        </div>
        <div className="action">
          <a onClick={this._addNote.bind(this)}><span className="pt-icon-standard pt-icon-plus" /></a>
        </div>
      </div>
    )
  }
}

let select = (state) => ({
  docs: state.docReducer.docs,
  currentNode: state.nodeReducer.currentNode
});

export default connect(select)(NotebookInfo);
