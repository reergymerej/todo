'use babel';

import React, {PropTypes} from 'react';
import Tree from './Tree';

function TreeNode(props) {
  const isLeaf = props.nodes.length === 0;
  let containerClassName = isLeaf
    ? 'list-item'
    : 'list-nested-item';

  if (props.collapsed) {
    containerClassName += ' collapsed';
  }

  const thisItemClassName = props.icon
    ? `icon ${props.icon}`
    : '';

  return (
    <li className={containerClassName}>
      <div className='list-item'>
        <span className={thisItemClassName}>{props.text}</span>
      </div>

      {
        !isLeaf &&
        <Tree
          data={{
            nodes: props.nodes,
          }}
        />
      }
    </li>
  );
}

TreeNode.propTypes = {
  text: PropTypes.string.isRequired,
  nodes: PropTypes.array.isRequired,
  collapsed: PropTypes.bool,
  icon: PropTypes.string,
};

export default TreeNode;
