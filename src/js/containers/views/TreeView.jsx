import React, { Component } from 'react';
import PropTypes from 'prop-type';

import { Classes, ITreeNode, Tooltip, Tree, TreeEventHandler } from "@blueprintjs/core";
import { remote } from 'electron';
const { Menu, MenuItem } = remote;

import { addNotebook } from '../../actions'

class TreeView extends Component {

  forEachNode(nodes, callback) {
    if (nodes == null) {
      return;
    }

    for (const node of nodes) {
      callback(node);
      this.forEachNode(node.childNodes, callback);
    }
  }

  render() {
    let { data } = this.props;
    return (
      <Tree
        key={133}
        contents={data}
        onNodeClick={this.handleNodeClick.bind(this)}
        onNodeCollapse={this.handleNodeCollapse.bind(this)}
        onNodeExpand={this.handleNodeExpand.bind(this)}
        onNodeContextMenu={this.renderContextMenu.bind(this)}
        className={Classes.ELEVATION_0} />
    );
  }

  createMenu(nodeData) {
    const menu = new Menu();
    menu.append(new MenuItem({ label: 'New Notebook...', click(node) { addNotebook(nodeData) } }));
    menu.append(new MenuItem({ label: 'Rename', click(node) { addNotebook(nodeData) } }));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: 'Delete Notebook...' }));
    menu.popup(remote.getCurrentWindow());
  }

  renderContextMenu(nodeData, _nodePath, e) {
    this.createMenu(nodeData)
  }

  handleNodeClick(nodeData, _nodePath, e) {
    console.log(nodeData, _nodePath)
  }

  handleNodeCollapse(nodeData) {
    nodeData.isExpanded = false;
    this.setState(this.state);
  }

  handleNodeExpand(nodeData) {
    nodeData.isExpanded = true;
    this.setState(this.state);
  }
}

export default TreeView;
