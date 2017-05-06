import React from 'react';

import brace from 'brace';
import 'brace/mode/asciidoc';
import 'brace/theme/sqlserver';
import AceEditor from 'react-ace';

class CodeEditor extends React.Component {

  render() {
    let { doc } = this.props;
    return (
      <div className="editorWrapper">
        <div className="title">
          <input type="text" className="pt-input pt-fill pt-large" value={doc.title} />
        </div>
        <div className="editor">
          <AceEditor
            width='100%'
            height='100%'
            mode='asciidoc'
            theme='sqlserver'
            value={doc.conetnt}
            showGutter={false}
            highlightActiveLine={false}
            wrapEnabled={true}
            fontSize='14px'
            name='UNIQUE_ID_OF_DIV'
            editorProps={{ $blockScrolling: true }} />
        </div>
      </div>
    )
  }
}

export default CodeEditor;
