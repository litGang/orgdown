import React from 'react';

import NoteBook from './notebook/NoteBook';
import db from '../config/db'

class Orgdown extends React.Component {
  componentDidMount() {
    db.notebooks.find({}, function(err, data) {
      console.log(data)
    })
  }
  render() {
    return (
        <NoteBook />
    )
  }
}

export default Orgdown;
