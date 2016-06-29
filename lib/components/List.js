'use babel';

import React, {PropTypes} from 'react';
import ListItem from './ListItem';

function List(props){
  return (
    <div className='list block panel-body'>
      {
        props.items.map((item, i) =>
          <ListItem
            key={i}
            item={item}
            onItemClick={props.onItemClick}
          />
        )
      }
    </div>
  );
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default List;
