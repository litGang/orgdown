import React from "react";
import { connect } from 'react-redux';
import { remote } from 'electron';
const { Menu, MenuItem } = remote

import { addDocs } from '../../actions/docs'

class NotebookInfo extends React.Component {
  _addNote() {
    let { dispatch } = this.props
    const menu = new Menu()
    menu.append(new MenuItem({ label: 'Markdown', click() { dispatch(addDocs('markdown')) } }))
    menu.append(new MenuItem({ label: 'Asciidoc', click() { dispatch(addDocs('asciidoc')) } }))
    menu.append(new MenuItem({ label: 'Normal', click() { dispatch(addDocs('normal')) } }))
    menu.popup(remote.getCurrentWindow())
  }

  render() {
    let { notebook } = this.props;
    return (
      <div className='orgdown-noteinfo'>
        <div className="sort">
          <span className="pt-icon-standard pt-icon-sort-desc"></span>
        </div>
        <div className="title">
          <b>{notebook.title}</b> {notebook.count}
        </div>
        <div className="action" onClick={this._addNote.bind(this)}>
          <span className="pt-icon-standard pt-icon-plus" />
        </div>
      </div>
    )
  }
}

let select = (state) => ({
  docs: state.docs
});

export default connect(select)(NotebookInfo);
