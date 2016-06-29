'use babel';

import React from 'react';
import {shallow} from 'enzyme';
import chai, {expect} from 'chai';
import TreeNode from '../../lib/components/TreeNode';

chai.should();

const node = {
  path: 'foo',
  text: 'foo',
  nodes: [
    {
      path: 'bar',
      text: 'bar',
      nodes: [],
    },
    {
      path: 'baz',
      text: 'baz',
      nodes: [
        {
          path: 'quux',
          text: 'quux',
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
  it('should display the text', () => {
    const node = {
      path: 'a tree node',
      text: 'a tree node',
      nodes: [],
    };
    const wrapper = shallow(factory(node));
    const item = wrapper.find('.list-item');
    expect(item.find('span').prop('children')).to.equal(node.text);
  });

  it('should display the icon', () => {
    const node = {
      path: 'a tree node',
      text: 'a tree node',
      icon: 'icon-big-horse',
      nodes: [],
    };
    const wrapper = shallow(factory(node));
    const item = wrapper.find('.list-item');
    expect(item.find('span').prop('className')).to.equal(`icon ${node.icon}`);
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
          nodes: [
            {
              path: 'quux',
              nodes: [],
            },
          ],
        }));
        wrapper.setState({ collapsed: true });
        expect(wrapper.prop('className')).to.equal('list-nested-item collapsed');
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
