import React, { Component } from 'react';
import PropTypes from 'prop-type';

import { Classes, ITreeNode, Tooltip, Tree, TreeEventHandler, Button, Dialog } from "@blueprintjs/core";
import { remote } from 'electron';
const { Menu, MenuItem } = remote;

import { addNotebook } from '../../actions'

class TreeView extends Component {

  constructor(props) {
    super()
    this.state = {
      nodes: props.data
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      nodes: nextProps.data
    })
  }

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
    return (
      <Tree
        contents={this.state.nodes}
        onNodeClick={this.handleNodeClick.bind(this)}
        onNodeCollapse={this.handleNodeCollapse.bind(this)}
        onNodeExpand={this.handleNodeExpand.bind(this)}
        onNodeContextMenu={this.renderContextMenu.bind(this)}
        className={Classes.ELEVATION_0} />
    );
  }

  addNotebook2(nodeData) {

  }

  createMenu(nodeData) {
    let addNotebook2 = this.addNotebook2;
    const menu = new Menu();
    menu.append(new MenuItem({ label: 'New Notebook...', click(node) { addNotebook2(nodeData) } }));
    menu.append(new MenuItem({ label: 'Rename', click(node) { console.log(nodeData) } }));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: 'Delete Notebook...' }));
    menu.popup(remote.getCurrentWindow());
  }

  renderContextMenu(nodeData, _nodePath, e) {
    this.createMenu(nodeData)
  }

  handleNodeClick(nodeData, _nodePath, e) {
    const originallySelected = nodeData.isSelected;
    if (!e.shiftKey) {
      this.forEachNode(this.state.nodes, (n) => n.isSelected = false);
    }
    nodeData.isSelected = originallySelected == null ? true : !originallySelected;
    this.setState(this.state);
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
