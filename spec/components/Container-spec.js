'use babel';

import React from 'react';
import {shallow} from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Container from '../../lib/components/Container';

chai.should();
chai.use(sinonChai);

function factory(props) {
  function noop() {}
  return (
    <Container
      onRefresh={ noop }
      onClose={ noop }
      onItemClick={ noop }
      items={ [] }
      {...props}
    />
  );
}

describe('<Container />', () => {
    describe('while loading', () => {
        describe('<Search />', () => {
            it('should not appear', () => {
                const wrapper = shallow(factory({ loading: true }));
                const search = wrapper.find('Search');
                expect(search.length).to.equal(0);
            });
        });
    });

    describe('after loading', () => {
        describe('<Search />', () => {
            it('should appear', () => {
                const wrapper = shallow(factory({ loading: false }));
                const search = wrapper.find('Search');
                expect(search.length).to.equal(1);
            });

            it('should trigger `onSearchChanged` when changed', () => {
                const spy = sinon.spy(Container.prototype, 'onSearchChanged');
                const wrapper = shallow(factory({ loading: false }));
                const search = wrapper.find('Search');
                const newValue = 'howdy do';
                const event = { target: { value: newValue } };
                search.simulate('change', event);
                spy.restore();
                spy.should.have.been.calledWith(event);
            });
        });
    });

    describe('onSearchChanged', () => {
        it('should filter the items given to <List />', () => {
            const items = [
                {
                    filePath: '/bar/foo.js',
                    relativePath: 'foo.js',
                    matches: [
                        {
                            lineText: 'asdf',
                            lineTextOffset: 0,
                            matchText: 'asdf',
                            range: [
                                [14, 7],
                                [14, 21],
                            ],
                        },

                        {
                            lineText: 'xxxx',
                            lineTextOffset: 0,
                            matchText: 'xxxx',
                            range: [
                                [14, 7],
                                [14, 21],
                            ],
                        },
                    ],
                },

                {
                    filePath: '/bar/foo.js',
                    relativePath: 'foo.js',
                    matches: [
                        {
                            lineText: 'qwer',
                            lineTextOffset: 0,
                            matchText: 'qwer',
                            range: [
                                [14, 7],
                                [14, 21],
                            ],
                        },
                    ],
                },
            ];

            // TODO?: Keep the unit testing for getFilteredItems, but
            // also test that List is getting the filtered props.

            // TODO?: Test case sensitivity

            const filtered = items.slice(0, 1);
            filtered[0].matches.pop();

            const wrapper = shallow(factory({
                loading: false,
                items,
            }));

            const getFilteredItems = wrapper.instance().getFilteredItems;
            expect(getFilteredItems(items, wrapper.state('searchValue')))
                .to.eql(items);

            const event = { target: { value: 'sd' } };
            wrapper.instance().onSearchChanged(event);
            expect(getFilteredItems(items, wrapper.state('searchValue')))
                .to.eql(filtered);
        });
    });
});
