'use babel';

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

function Controls(props){
  return (
    <div className='btn-toolbar'>
      <div className='controls btn-group'>
        <button
        className='btn icon icon-sync'
        onClick={ props.onRefresh }
        />
        <button
        className='btn icon icon-x'
        onClick={ props.onClose }
        />
      </div>
    </div>
  );
  /*<button class='btn icon icon-gear inline-block-tight'>Settings</button>*/
}

Controls.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Controls;
