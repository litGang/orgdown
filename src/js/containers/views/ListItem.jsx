import React from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';
const { Menu, MenuItem } = remote

import { selectDoc, deleteNote } from '../../actions'

import classNames from "classnames";

class ListItem extends React.Component {
  constructor() {
    super();
    this.selectItem = this.selectItem.bind(this);
    this._deleteNote = this._deleteNote.bind(this);
  }

  _deleteNote() {
    let { item } = this.props;
    this.props.dispatch(deleteNote(item))
  }

  render() {
    let { item } = this.props;
    const styles = classNames("doc-item", {
      active: item.active || false
    })
    return (
      <div>
        <div className={styles}
        onDragStart={() => console.log('12312')}
          onContextMenu={this.renderContextMenu.bind(this)}
          onClick={() => this.selectItem(item)} >
          <div className="doc-title">{item.title}</div>
          <div className="doc-desc">{item.conetnt}</div>
          {/*<div className="doc-time">{item.updatedAt.toString()}</div>*/}
        </div>
      </div>
    )
  }

  selectItem(item) {
    this.props.dispatch(selectDoc(item))
  }

  renderContextMenu() {
    let {item} = this.props;
    let doDeleteNote = this._deleteNote;
    const menu = new Menu()
    menu.append(new MenuItem({ label: 'Delete Note', click() {
      doDeleteNote(item)
     } }))
    menu.append(new MenuItem({ type: 'separator' }))
    menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))
    menu.popup(remote.getCurrentWindow())
  }
}


let select = (state) => ({
  docs: state.docs
});

export default connect(select)(ListItem);
