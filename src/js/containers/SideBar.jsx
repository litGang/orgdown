import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-type';

import TreeView from './views/TreeView';
import UserInfo from './user/UserInfo';
import { loadNotes } from '../actions/nodes';

import { unflatten } from '../common/utils'

import './sidebar.scss';

class SideBar extends React.Component {

  componentWillMount() {
    // this.props.dispatch(loadNotes())
  }

  _renderTreeView(datas) {
    return (
      <div className='orgdown-treeview'>
        <div className="baner">Notebooks</div>
        <TreeView data={datas} />
      </div>
    )
  }

  render() {
    let { nodes } = this.props;
    return (
      <div className='orgdown-sidebar'>
        {this._renderTreeView(nodes)}
        <UserInfo user={{ name: 'wangyg' }} />
      </div>
    )
  }
}

let select = (state) => ({
  nodes: unflatten(state.nodeReducer.nodes)
});

export default connect(select)(SideBar);
