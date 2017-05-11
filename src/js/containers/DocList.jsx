import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { InputGroup, NonIdealState } from '@blueprintjs/core';

import ListView from './views/ListView';
import NotebookInfo from './notes/NotebookInfo';

import './doclist.scss';

import { loadDocs, addDocs, selectDoc } from '../actions/docs'

class DocList extends React.Component {
  constructor() {
    super();
    this._onSelect.bind(this)
  }

  componentWillMount() {
    this.props.dispatch(loadDocs())
  }

  _onSelect() {
    let dispatch = this.props.dispatch
    return (data) => {
      dispatch(selectDoc(data))
    }
  }

  render() {
    const { docs } = this.props;
    return (
      <div className='orgdown-doclist'>
        <NotebookInfo notebook={{title: 'Java', count: 2}} />
        <InputGroup
          className='doclist-search'
          leftIconName="search"
          placeholder="Filter histogram..."
          type='search' />
        <div className='docs'>
          <ListView data={docs} />
        </div>
      </div>
    );
  }
}

let select = (state) => ({
  docs: state.docReducer.docs
});

export default connect(select)(DocList);
