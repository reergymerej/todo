'use babel';

import React, {PropTypes} from 'react';

function Status(props){
  return (
    <div>
      <div className='block'>searched {props.pathsSearched} paths</div>
      {
        props.loading
        && <div className='loading loading-spinner-large block'></div>
      }
    </div>
  );
}

Status.propTypes = {
  loading: PropTypes.bool.isRequired,
  pathsSearched: PropTypes.number,
};

export default Status;
