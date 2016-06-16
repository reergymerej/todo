'use babel';

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

function Controls(props){
  return (
    <div className='block'>
      <button
        className='btn'
        onClick={ props.onRefresh }
        >refresh</button>
    </div>
  );
}

Controls.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export default Controls;
