'use babel';

import React, {PropTypes} from 'react';
import TreeNode from './TreeNode';

function Tree(props) {
  return (
    <ul className='list-tree has-collapsable-children'>
      {
        props.data.nodes.map(node =>
          <TreeNode
            key={node.path}
            {...node}
          />
        )
      }
    </ul>
  );
}

Tree.propTypes = {
  data: PropTypes.shape({
    nodes: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string.isRequired,
    })).isRequired,
  }),
};

export default Tree;
