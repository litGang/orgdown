import React, { Component, PropTypes } from "react";
import SideBar from './SideBar'
import DocList from './DocList'
import Editor from '../editor/Editor'

class NoteBook extends Component {
    render() {
        return (
            <div className='orgdown-notebook flex-container'>
                <SideBar />
                <DocList />
                <Editor />
            </div>
        )
    }
}

export default NoteBook;