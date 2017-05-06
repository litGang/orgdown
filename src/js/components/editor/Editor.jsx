import * as React from 'react';

import { AnchorButton } from '@blueprintjs/core';

import brace from 'brace';
import 'brace/mode/asciidoc';
import 'brace/theme/sqlserver';
import AceEditor from 'react-ace';

class Editor extends React.Component {
  render() {
    return (
      <div className='orgdown-editor' style={{ width: '100%', height: '100%' }}>
        <div className="orgdown-editor-title">
          <div className="top-title">
            <input className="pt-input" type="text" placeholder="Text input" dir="auto" />
          </div>
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
