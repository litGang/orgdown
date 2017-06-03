import React, { Component } from 'react';
import PropTypes from 'prop-type';
import { connect } from 'react-redux';

import { Classes, ITreeNode, Tooltip, Tree, TreeEventHandler, Button, Dialog } from "@blueprintjs/core";
import { remote } from 'electron';
const { Menu, MenuItem } = remote;

import { selectTreeItem, expandNode } from '../../actions/nodes'

import AddNoteBookDialog from '../notes/AddNoteBookDialog'
import DeleteNoteBookDialog from '../notes/DeleteNoteBookDialog'

class TreeView extends Component {

  constructor(props) {
    super()
    this.state = {
      nodes: props.data,
      isSaveOpen: false,
      isDeleteOpen: false,
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

  toggleSaveDialog() {
    this.setState({ isSaveOpen: !this.state.isSaveOpen });
  }

  toggleDeleteDialog() {
    this.setState({ isDeleteOpen: !this.state.isDeleteOpen });
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
        <AddNoteBookDialog isOpen={this.state.isSaveOpen} note={this.state.note} toggleDialog={this.toggleSaveDialog.bind(this)} />
        <DeleteNoteBookDialog isOpen={this.state.isDeleteOpen} note={this.state.note} toggleDialog={this.toggleDeleteDialog.bind(this)} />
      </div>
    );
  }

  addNotebook2(nodeData) {
    this.setState({
      note: nodeData
    })
    this.toggleSaveDialog()
  }

  deleteNotebook(nodeData) {
    this.setState({
      note: nodeData
    })
    this.toggleDeleteDialog()
  }

  createMenu(nodeData) {
    let addNotebook2 = this.addNotebook2;
    let deleteNotebook = this.deleteNotebook;
    const menu = new Menu();
    menu.append(new MenuItem({ label: 'New Document...', click(node) { addNotebook2(nodeData) } }));
    menu.append(new MenuItem({ label: 'New Notebook...', click(node) { addNotebook2(nodeData) } }));
    menu.append(new MenuItem({ label: 'Rename', click(node) { console.log(nodeData) } }));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({
      label: 'Delete Notebook...',
      click(node) {
        if (node._id != 'root')
        deleteNotebook(nodeData)
      }
    })
    );
    menu.popup(remote.getCurrentWindow());
  }

  renderContextMenu(nodeData, _nodePath, e) {
    this.handleNodeClick(nodeData, _nodePath, e);
    this.createMenu(nodeData)
  }

  handleNodeClick(nodeData, _nodePath, e) {
    if (!e.shiftKey) {
      this.forEachNode(this.state.nodes, (n) => n.isSelected = false);
    }
    nodeData.isSelected = true;
    this.props.dispatch(selectTreeItem(nodeData))
    this.setState(this.state);
  }

  handleNodeCollapse(nodeData) {
    nodeData.isExpanded = false;
    this.props.dispatch(expandNode(nodeData, false))
    this.setState(this.state);
  }

  handleNodeExpand(nodeData) {
    nodeData.isExpanded = true;
    this.props.dispatch(expandNode(nodeData, true))
    this.setState(this.state);
  }
}

export default connect()(TreeView);
