import React, { Component, PropTypes } from "react";

import brace from 'brace';
import 'brace/mode/asciidoc';
import 'brace/theme/sqlserver';
import AceEditor from 'react-ace';

class Editor extends Component {
    render() {
        return (
            <div className='orgdown-editor'>
	        <div className='orgdown-editor-title'>title</div>
	        <div className='orgdown-editor-toolbar'>toolbar</div>
            <AceEditor mode='asciidoc' theme='sqlserver' width='100%' height='100%' style={{flex: 1}} fontSize='16px' wrapEnabled={true}
            showGutter={false} wrapEnabled={true} editorProps={{maxLines: Infinity}} />
            </div>
        );
    }
}

export default Editor;
