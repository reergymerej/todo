'use babel';

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Controls from './Controls';

// TODO: make the button look better
function Header(props){
  return (
    <div className='panel-heading'>
      <h1>TODO</h1>
      <Controls onRefresh={props.onRefresh} />
    </div>
  );
}

Header.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export default Header;
