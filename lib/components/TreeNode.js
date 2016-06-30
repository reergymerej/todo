'use babel';

import React, {PropTypes} from 'react';
import Tree from './Tree';

class TreeNode extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = {
      collapsed: false,
    };
  }

  render() {
    const isLeaf = this.props.nodes.length === 0;
    let containerClassName = isLeaf
      ? 'list-item'
      : 'list-nested-item';

    if (this.state.collapsed) {
      containerClassName += ' collapsed';
    }

    const thisItemClassName = this.props.icon
      ? `icon ${this.props.icon}`
      : '';

    // TODO: add classes to subdue directories and highlight text nodes

    return (
      <li
        className={containerClassName}
        onClick={this.onClick}
        >
        <div className='list-item'>
          <span className={thisItemClassName}>{this.props.text}</span>
        </div>

        {
          !isLeaf &&
          <Tree
            data={{
              nodes: this.props.nodes,
            }}
          />
        }
      </li>
    );
  }

  onClick(event) {
    event.stopPropagation();

    if (this.props.nodes.length) {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    }

    if (this.props.onClick) {
      this.props.onClick(this.props.data);
    }
  }
}

TreeNode.propTypes = {
  text: PropTypes.string.isRequired,
  nodes: PropTypes.array.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  data: PropTypes.object,
};

export default TreeNode;
