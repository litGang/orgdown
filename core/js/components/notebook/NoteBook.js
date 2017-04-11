import React, { Component, PropTypes } from "react";
import SplitPane from 'react-split-pane'
import SideBar from './SideBar'
import DocList from './DocList'
import Editor from '../editor/Editor'

class NoteBook extends Component {
    render() {
        return (
            <div className='container'>
            <SplitPane minSize="250" defaultSize="250">
                <SideBar />
                <div>
                  <SplitPane minSize='300' defaultSize='300'>
                      <DocList />
                <Editor />
                  </SplitPane>
                </div>
            </SplitPane>

            </div>
        )
    }
}

export default NoteBook;
