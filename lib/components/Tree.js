'use babel';

import React, {PropTypes} from 'react';
import TreeNode from './TreeNode';

function Tree(props) {
  return (
    <ul className='list-tree has-collapsable-children'>
      {
        props.data.nodes.map((node, i) =>
          <TreeNode
            {...node}
            key={i}
            onClick={props.onNodeClick}
          />
        )
      }
    </ul>
  );
}

Tree.propTypes = {
  data: PropTypes.shape({
    nodes: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
    })).isRequired,
  }),
  onNodeClick: PropTypes.func,
};

export default Tree;
