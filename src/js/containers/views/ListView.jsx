import React from 'react';

import { InputGroup, NonIdealState } from '@blueprintjs/core'

import ListItem from './ListItem';

class ListView extends React.Component {

  _renderItems(data) {
    return data.map((item) => {

      return (
        <ListItem key={item._id} item={item} />
      );
    });
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        {data.map((item) => {
          let newItem = { ...item }
          return <ListItem key={newItem._id} item={newItem} />
        })}
      </div>
    )
  }
}

export default ListView;
