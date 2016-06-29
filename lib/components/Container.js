'use babel';

import React, {PropTypes} from 'react';
import Header from './Header';
import List from './List';
import Empty from './Empty';
import Status from './Status';
import Search from './Search';

function Container(props) {
  return (
    <atom-panel className='right'>
    <div className='padded'>
    <div className='inset-panel'>
    <div className='panel-heading'>
    <Header
    onRefresh={props.onRefresh}
    onClose={props.onClose}
    count={props.items && props.items.length}
    />

    <Search
        onChange={(searchVal) => console.log(searchVal) }
    />

    </div>
    <div className='panel-body padded'>
    <Status
    loading={props.loading}
    pathsSearched={props.pathsSearched}
    />
    {
      !props.loading
      && (
        props.items.length
        ? <List
        items={props.items}
        onItemClick={props.onItemClick}
        />
        : <Empty />
      )
    }
    </div>
    </div>
    </div>
    </atom-panel>
  );
}

Container.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  pathsSearched: PropTypes.number,
};

export default Container;
