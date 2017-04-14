import React, { Component, PropTypes } from "react";

import brace from 'brace';
import 'brace/mode/asciidoc';
import 'brace/theme/sqlserver';
import AceEditor from 'react-ace';

class Editor extends Component {
  render() {
    return (
      <div className='orgdown-editor' style={{ width: '100%', height: '100%' }}>
        <div className="orgdown-editor-title">

        </div>
        <div className="orgdown-editor-toolbar"></div>
        <AceEditor
          width='100%'
          height='calc(100vh - 55px)'
          mode='asciidoc'
          theme='sqlserver'
          value={"123131293"}
          showGutter={false}
          highlightActiveLine={false}
          wrapEnabled={true}
          fontSize='14px'
          name='UNIQUE_ID_OF_DIV'
          editorProps={{ $blockScrolling: true }} />
      </div>
    );
  }
}

export default Editor;
