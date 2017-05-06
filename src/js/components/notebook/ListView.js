import React from 'react';

import { InputGroup, NonIdealState } from '@blueprintjs/core';

import DocItem from './DocItem';

class ListView extends React.Component {
  render() {
    return (
      <div className='orgdown-doclist'>
        <InputGroup
          className='doclist-search'
          leftIconName="search"
          placeholder="Filter histogram..."
          type='search'
        />
        <div className='docs'>
          <DocItem />
          <DocItem />
          <DocItem active={true} />
          <DocItem />
          <DocItem />
          <DocItem />
          <DocItem />
          <DocItem />
          <DocItem />
        </div>
      </div>
    )
  }
}

export default ListView;
