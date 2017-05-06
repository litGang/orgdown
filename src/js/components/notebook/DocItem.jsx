import React from 'react';
import { remote } from 'electron';
const { Menu, MenuItem } = remote

import classNames from "classnames";

class DocItem extends React.Component {
  constructor() {
    super();
    const menu = new Menu()
    menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
    menu.append(new MenuItem({ type: 'separator' }))
    menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))
    this.menu = menu;
  }

  render() {
    const styles = classNames("doc-item", {
      active: this.props.active
    })
    return (
      <div>
        <div className={styles} onContextMenu={this.renderContextMenu.bind(this)}>
          <div className="doc-title">Java建站</div>
          <div className="doc-desc">2017-04-12</div>
        </div>
      </div>
    )
  }

  renderContextMenu() {
    // return a single element, or nothing to use default browser behavior
    this.menu.popup(remote.getCurrentWindow())
  }
}

export default DocItem;
