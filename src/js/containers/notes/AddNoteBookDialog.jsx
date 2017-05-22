import React from 'react'
import {connect} from 'react-redux'
import { InputGroup, Button, Dialog } from "@blueprintjs/core";

import { addNotebook } from '../../actions'

class AddNoteBookDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteName: props.noteName
    }
  }

  saveNotebook() {
    this.props.dispatch(addNotebook(this.state.noteName, this.props.note))
    this.props.toggleDialog()
  }

  render() {
    return (
      <Dialog
        iconName="inbox"
        isOpen={this.props.isOpen}
        onClose={this.props.toggleDialog}
        title="New Notebooks">
        <div className="pt-dialog-body">
          <div>
            <InputGroup onChange={(event) => {this.setState({noteName: event.target.value})}} placeholder="Text input" />
          </div>
        </div>
        <div className="pt-dialog-footer">
          <div className="pt-dialog-footer-actions">
            <Button text="Cancel" onClick={this.props.toggleDialog} />
            <Button className="pt-button pt-intent-success" onClick={this.saveNotebook.bind(this)} text="Submit" />
          </div>
        </div>
      </Dialog >
    )
  }
}

export default connect()(AddNoteBookDialog);
