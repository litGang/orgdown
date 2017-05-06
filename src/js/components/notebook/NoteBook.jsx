import React from 'react';
import SplitPane from 'react-split-pane'
import SideBar from './SideBar'
import ListView from '../../containers/ListView'
import Editor from '../editor/Editor'

class NoteBook extends React.Component {
  render() {
    return (
      <SplitPane minSize={200} defaultSize={250}>
        <SideBar />
        <SplitPane minSize={250} defaultSize={300}>
          <ListView />
          <Editor />
        </SplitPane>
      </SplitPane>
    )
  }
}

export default NoteBook;
