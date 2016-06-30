'use babel';

import React, {PropTypes} from 'react';
import TreeNode from './TreeNode';

function Tree(props) {
  return (
    <ul className='list-tree has-collapsable-children'>
      {
        props.data.nodes.map(node =>
          <TreeNode
            key={node.text}
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
      text: PropTypes.string.isRequired,
    })).isRequired,
  }),
};

export default Tree;
