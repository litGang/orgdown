import React from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';
const { Menu, MenuItem } = remote

import {selectDoc} from '../../actions'

import classNames from "classnames";

class ListItem extends React.Component {
  constructor() {
    super();
    const menu = new Menu()
    menu.append(new MenuItem({ label: 'MenuItem1', click() { cosole.log("data") } }))
    menu.append(new MenuItem({ type: 'separator' }))
    menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))
    this.menu = menu;

    this.selectItem.bind(this);
  }

  render() {
    let { item } = this.props;
    const styles = classNames("doc-item", {
      active: item.active || false
    })
    return (
      <div>
        <div className={styles}
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
    this.menu.popup(remote.getCurrentWindow())
  }
}


let select = (state) => ({
  docs: state.docs
});

export default connect(select)(ListItem);
