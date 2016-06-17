'use babel';

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import List from './List';

// TODOS: Maybe change this whole thing into a component.  I shouldn't affect anything as long as it still provides the correct public methods.  Also, this is a test to see how really long comments will render.

function Container(props) {
  return (
    <atom-panel className='right'>
      <div className='padded'>
        <div className='inset-panel'>
          <div className='panel-heading'>
            <Header
              onRefresh={props.onRefresh}
              onClose={props.onClose}
              />
          </div>
          <div className='panel-body padded'>
            {
              props.loading
              ? <div className='loading loading-spinner-large block'></div>
              : <List
              items={props.items}
              onItemClick={props.onItemClick}
              />
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
};

export default Container;
