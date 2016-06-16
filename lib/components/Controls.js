'use babel';

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

function Controls(props){
  return (
    <div className='controls'>
      <button
      className='btn icon icon-sync'
      onClick={ props.onRefresh }
      >refresh</button>
    </div>

  );
  /*<button class='btn icon icon-gear inline-block-tight'>Settings</button>*/
}

Controls.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export default Controls;
