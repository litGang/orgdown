import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-type';

import TreeView from './views/TreeView';
import UserInfo from './user/UserInfo';
import { loadNotes } from '../actions/note'

class SideBar extends React.Component {

  componentWillMount() {
    this.props.dispatch(loadNotes())
  }

  _renderTreeView(datas) {
    return datas.map((data) => {
      return (
        <div className='orgdown-treeview'>
          <div className="baner">{data.title}</div>
          <TreeView data={data.nodes} />
        </div>
      )
    })
  }

  render() {
    let { notes } = this.props;
    return (
      <div className='orgdown-sidebar'>
        {this._renderTreeView(notes)}
        <UserInfo user={{ name: 'wangyg' }} />
      </div>
    )
  }
}

let select = (state) => ({
  notes: state.nodes.notes
});

export default connect(select)(SideBar);
