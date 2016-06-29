'use babel';

import React, {PropTypes} from 'react';
import Controls from './Controls';

function Header(props){
  return (
    <div className='header'>
      <h1>todo {
        !!props.count && <span className='badge badge'>{props.count}</span>
      }
      </h1>

      <Controls
        onRefresh={props.onRefresh}
        onClose={props.onClose}
      />
    </div>
  );
}

Header.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  count: PropTypes.number,
};

export default Header;
