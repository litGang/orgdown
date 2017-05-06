import React from "react";
import { connect } from 'react-redux';

import { addDocs } from '../../actions/docs'

class NotebookInfo extends React.Component {
  _addNote() {
    this.props.dispatch(addDocs())
  }

  render() {
    let { notebook, onAddNote } = this.props;
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
