import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InputGroup, NonIdealState } from '@blueprintjs/core';

import ListView from './views/ListView';
import NotebookInfo from './notes/NotebookInfo';

import { loadDocs, addDocs, selectDoc } from '../actions/docs'

import './doclist.scss';

class DocList extends React.Component {

  componentWillMount() {
    const { docs, currentNode } = this.props;
    this.props.dispatch(loadDocs(currentNode))
  }

  render() {
    const { docs, currentNode } = this.props;
    return (
      <div className='orgdown-doclist'>
        <NotebookInfo />
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
