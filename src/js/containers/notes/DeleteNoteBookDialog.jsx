import React from 'react'
import { connect } from 'react-redux'

import { Alert, Intent } from "@blueprintjs/core";

import { deleteNotebook } from '../../actions'

class DeleteNoteBookDialog extends React.Component {

  doDelete() {
    this.props.dispatch(deleteNotebook(this.props.note))
    this.props.toggleDialog()
  }

  doCancel() {
    this.props.toggleDialog()
  }

  render() {
    return (
      <Alert
        className={this.props.themeName}
        intent={Intent.PRIMARY}
        isOpen={this.props.isOpen}
        confirmButtonText="Move to Trash"
        cancelButtonText="Cancel"
        onConfirm={this.doDelete.bind(this)}
        onCancel={this.doCancel.bind(this)}
      >
        <p>
          Are you sure you want to move <b>filename</b> to Trash? You will be able to restore
                        it later, but it will become private to you.
                    </p>
      </Alert>
    )
  }
}

export default connect()(DeleteNoteBookDialog)
