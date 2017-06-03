import React from 'react';
import SplitPane from 'react-split-pane';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

import { Classes, ITreeNode, Tooltip, Tree, TreeEventHandler } from "@blueprintjs/core";

import { loadNodes } from '../actions/nodes';
import { loadDocs } from '../actions/docs'

import SideBar from './SideBar';
import DocList from './DocList';
import MindWork from './MindWork';

class Orgdown extends React.Component {
  constructor() {
    super()
    this.loadSideBarTreeView = this.loadSideBarTreeView.bind(this)
    this.loadDocListView = this.loadDocListView.bind(this)
    this.initEditor = this.initEditor.bind(this)
  }

  initialize() {
    console.log("orgdown is initialize...")
    let nodeId = localStorage.nodeId;
    let docId = localStorage.docId;
    let posInfo = localStorage.posInfo;

    this.loadSideBarTreeView(nodeId)
    this.loadDocListView(nodeId, docId);
    this.initEditor(posInfo)
  }

  loadSideBarTreeView(nodeId) {
    this.props.dispatch(loadNodes(nodeId))
  }

  loadDocListView(nodeId, docId) {
    this.props.dispatch(loadDocs(nodeId, docId))
  }

  initEditor(posInfo) {
    // this.props.dispatch(loadNotes(treeId))
  }

  componentWillMount() {
    this.initialize()
  }

  render() {
    return (
      <SplitPane minSize={200} maxSize={300} defaultSize={200}>
        <SideBar />
        <SplitPane minSize={200} maxSize={350} defaultSize={250}>
          <DocList />
          <MindWork hello="wangyg" name="orgdown" />
        </SplitPane>
      </SplitPane>
    )
  }
}

export default connect()(Orgdown);
