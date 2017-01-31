import React, { Component, PropTypes } from "react";

import brace from 'brace'
import 'brace/mode/asciidoc';
import 'brace/theme/sqlserver';
import AceEditor from 'react-ace';

// import MonacoEditor from 'react-monaco-editor';

import {Editor as DraftEditor, EditorState} from 'draft-js';

class Editor extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
    }

    render() {
        return (
            <div className='orgdown-editor flex-item'>
                <h1>Editor</h1>
            </div>
        )
    }
}

export default Editor;