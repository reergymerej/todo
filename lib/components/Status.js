'use babel';

import React, {PropTypes} from 'react';

function Status(props){
  return (
    props.loading
    ? <div className='loading loading-spinner-large block'></div>
    : <div className='block'>{props.count}</div>
  );
}

Status.propTypes = {
  loading: PropTypes.bool.isRequired,
  count: PropTypes.number,
};

export default Status;
