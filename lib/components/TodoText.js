'use babel';

import React, {PropTypes} from 'react';

function TodoText(props) {
  function onClick() {
    props.onClick(props.range);
  }

  return (
    <div
      onClick={onClick}
      className='todo-text'
    >{props.text}</div>
  );
}

TodoText.propTypes = {
  text: PropTypes.string.isRequired,
  range: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TodoText;
