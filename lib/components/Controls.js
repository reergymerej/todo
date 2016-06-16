'use babel';

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

function Controls(props){
  return (
    <div className='block'>
      <button
        className='btn icon icon-sync'
        onClick={ props.onRefresh }
        >refresh</button>

        <div class='block'>
    {/*<button class='btn icon icon-gear inline-block-tight'>Settings</button>*/}
</div>
    </div>
  );
}

Controls.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export default Controls;
