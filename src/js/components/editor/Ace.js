import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

import brace from 'brace'
import 'brace/mode/asciidoc';
import 'brace/theme/sqlserver'
import AceEditor from 'react-ace';

class Ace extends Component {

      render() {
      	  return <AceEditor theme='sqlserver' mode='asciidoc' fontSize='16px' editorProps={{
	      lineNumber: false
	  }} />
      }
      
}

export default Ace;