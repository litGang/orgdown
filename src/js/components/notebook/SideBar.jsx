import React from "react";
import { remote } from 'electron';
const { Menu, MenuItem } = remote

import FileTree from './FileTree';

class SideBar extends React.Component {
  render() {
    return (
      <div className='orgdown-sidebar'>

        <div className="baner">Notebooks</div>
        <FileTree />
      </div>
    )
  }
}

export default SideBar;
