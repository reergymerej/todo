'use babel';

import React from 'react';
import {shallow} from 'enzyme';
import chai, {expect} from 'chai';
import Tree from '../../lib/components/Tree';

chai.should();

/*
* TreeNode
* {String} text
* {String} icon
* {Object} data
* {Node[]} nodes
* {Boolean} collapsed
*
*/

const root = {
  nodes: [
    {
      text: 'foo',
      nodes: [
        {
          text: 'bar',
          nodes: [],
        },
        {
          text: 'baz',
          nodes: [],
        },
      ],
    },
    {
      text: 'quuz',
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
