'use babel';

import React from 'react';
import {shallow} from 'enzyme';
import chai, {expect} from 'chai';
import TreeNode from '../../lib/components/TreeNode';

chai.should();

const node = {
  path: 'foo',
  nodes: [
    {
      path: 'bar',
      nodes: [],
    },
    {
      path: 'baz',
      nodes: [
        {
          path: 'quux',
          nodes: [],
        },
      ],
    },
  ],
};

function factory(props) {
  return (
    <TreeNode
      {...node}
      {...props}
    />
  );
}

describe('<TreeNode />', () => {
  it('should display the path', () => {
    const node = {
      path: 'a tree node',
      nodes: [],
    };
    const wrapper = shallow(factory(node));
    const item = wrapper.find('.list-item');
    expect(item.find('span').prop('children')).to.equal(node.path);
  });

  describe('no child nodes', () => {
    it('should have the proper className', () => {
      const wrapper = shallow(factory({
        nodes: [],
      }));
      expect(wrapper.prop('className')).to.equal('list-item');
    });

    describe('this node\'s element', () => {
      it('should not an icon', () => {
        const wrapper = shallow(factory({
          nodes: [],
        }));
        const item = wrapper.find('.list-item');
        expect(item.find('span').prop('className')).to.equal('');
      });
    });

    describe('nested-nodes', () => {
      it('should not render', () => {
        const wrapper = shallow(factory({
          nodes: [],
        }));
        expect(wrapper.find('Tree').length).to.equal(0);
      });
    });
  });

  describe('with child nodes', () => {
    describe('container', () => {
      it('should have the proper className', () => {
        const wrapper = shallow(factory());
        expect(wrapper.prop('className')).to.equal('list-nested-item');
      });

      it('should have the proper className when collapsed', () => {
        const wrapper = shallow(factory({
          path: 'withchildren',
          collapsed: true,
          nodes: [
            {
              path: 'quux',
              nodes: [],
            },
          ],
        }));
        expect(wrapper.prop('className')).to.equal('list-nested-item collapsed');
      });
    });

    describe('this node\'s element', () => {
      it('should show a directory', () => {
        const wrapper = shallow(factory());
        const item = wrapper.find('.list-item');
        expect(item.find('span').prop('className')).to.equal('icon icon-file-directory');
      });
    });

    describe('nested-nodes', () => {
      it('should render', () => {
        const wrapper = shallow(factory());
        const tree = wrapper.find('Tree');
        expect(tree.length).to.equal(1);
      });
    });
  });
});
