'use babel';

import React, {PropTypes} from 'react';

function Search(props) {
    return (
        <input
            type='text'
            className='search block native-key-bindings'
            onChange={props.onChange}
            placeholder='search results'
        />
    );
}

Search.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default Search;
