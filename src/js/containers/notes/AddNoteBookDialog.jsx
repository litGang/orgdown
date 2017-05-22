import React from 'react'
import { Classes, ITreeNode, Tooltip, Tree, TreeEventHandler, Button, Dialog } from "@blueprintjs/core";

class AddNoteBookDialog extends React.Component {

  render() {
    return (
      <Dialog
        iconName="inbox"
        isOpen={this.props.isOpen}
        onClose={this.toggleDialog.bind(this)}
        title="Dialog header">
        <div className="pt-dialog-body">
          Some content
          </div>
        <div className="pt-dialog-footer">
          <div className="pt-dialog-footer-actions">
            <Button text="Secondary" />
            <Button onClick={this.toggleDialog.bind(this)} text="Primary" />
          </div>
        </div>
      </Dialog>
    )
  }
}

export default AddNoteBookDialog;
