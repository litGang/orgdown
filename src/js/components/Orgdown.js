import React, { Component, PropTypes } from "react";

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import NoteBook from './notebook/NoteBook'

class Orgdown extends Component {
  render() {
    return (
      <NoteBook />
    )
  }
}

export default Orgdown;
