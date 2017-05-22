import React, { Component } from 'react';
import PropTypes from 'prop-type';

import { Classes, ITreeNode, Tooltip, Tree, TreeEventHandler, Button, Dialog } from "@blueprintjs/core";
import { remote } from 'electron';
const { Menu, MenuItem } = remote;

import AddNoteBookDialog from '../notes/AddNoteBookDialog'
import DeleteNoteBookDialog from '../notes/DeleteNoteBookDialog'

class TreeView extends Component {

  constructor(props) {
    super()
    this.state = {
      nodes: props.data,
      isOpen: false,
      note: undefined
    }
    this.addNotebook2 = this.addNotebook2.bind(this)
    this.deleteNotebook = this.deleteNotebook.bind(this)
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

  toggleDialog() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div>
        <Tree
          contents={this.state.nodes}
          onNodeClick={this.handleNodeClick.bind(this)}
          onNodeCollapse={this.handleNodeCollapse.bind(this)}
          onNodeExpand={this.handleNodeExpand.bind(this)}
          onNodeContextMenu={this.renderContextMenu.bind(this)}
          className={Classes.ELEVATION_0} />
        <AddNoteBookDialog isOpen={this.state.isOpen} note={this.state.note} toggleDialog={this.toggleDialog.bind(this)} />
        <DeleteNoteBookDialog isOpen={this.state.isOpen} note={this.state.note} toggleDialog={this.toggleDialog.bind(this)} />
      </div>
    );
  }

  addNotebook2(nodeData) {
    this.setState({
      note: nodeData
    })
    this.toggleDialog()
  }

  deleteNotebook(nodeData) {
    this.setState({
      note: nodeData
    })
    this.toggleDialog()
  }

  createMenu(nodeData) {
    let addNotebook2 = this.addNotebook2;
    let deleteNotebook = this.deleteNotebook;
    const menu = new Menu();
    menu.append(new MenuItem({ label: 'New Notebook...', click(node) { addNotebook2(nodeData) } }));
    menu.append(new MenuItem({ label: 'Rename', click(node) { console.log(nodeData) } }));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: 'Delete Notebook...', click(node) { deleteNotebook(nodeData) } }));
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
