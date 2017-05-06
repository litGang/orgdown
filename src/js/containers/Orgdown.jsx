import React from 'react';
import SplitPane from 'react-split-pane';
import { connect } from 'react-redux';

import { Classes, ITreeNode, Tooltip, Tree, TreeEventHandler } from "@blueprintjs/core";

import SideBar from './SideBar';
import DocList from './DocList';
import MindWork from './MindWork';

class Orgdown extends React.Component {

  componentWillMount() {
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

let select = (dispatch, state) => ({
  nodes: state.nodes
});

export default connect(select)(Orgdown);
