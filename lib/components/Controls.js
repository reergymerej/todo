'use babel';

import React, {PropTypes} from 'react';

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
}

Controls.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Controls;
