'use babel';

import React from 'react';
import {shallow} from 'enzyme';
import chai, {expect} from 'chai';
import Tree from '../../lib/components/Tree';

chai.should();

/*
* TreeNode
* {String} path
* {Node[]} nodes
* {Boolean} collapsed
*
*/

const root = {
  path: '/',
  nodes: [
    {
      path: 'foo',
      nodes: [
        {
          path: 'bar',
          nodes: [],
        },
        {
          path: 'baz',
          nodes: [],
        },
      ],
    },
    {
      path: 'quuz',
      nodes: [],
    },
  ],
};

function factory(props) {
  return (
    <Tree
      data={root}
      {...props}
    />
  );
}

describe('<Tree />', () => {
  it('should render each of the nodes', () => {
    const wrapper = shallow(factory());
    const nodes = wrapper.children('TreeNode');
    expect(nodes.length).to.equal(root.nodes.length);
  });
});
