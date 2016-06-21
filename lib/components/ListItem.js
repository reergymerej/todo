'use babel';

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import TodoText from './TodoText';

function ListItem(props) {
  function onItemClick(range) {
    props.onItemClick(props.item.filePath, range);
  }

  return (
    <div className='list-item'>
      <div className='filepath'>{props.item.relativePath}</div>
      <div>
        {
          props.item.matches.map((match, i) =>
            <TodoText
              key={i}
              text={match.matchText}
              range={match.range}
              onClick={onItemClick}
            />
          )
        }
      </div>
    </div>
  );
}

ListItem.propTypes = {
  item: PropTypes.shape({
    relativePath: PropTypes.string.isRequired,
    filePath: PropTypes.string.isRequired,
    matches: PropTypes.array.isRequired,
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ListItem;
