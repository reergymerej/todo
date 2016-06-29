'use babel';

import React from 'react';
import {shallow} from 'enzyme';
import chai, {expect} from 'chai';
import Header from '../../lib/components/Header';

chai.should();

function factory(props) {
  function noop() {}
  return (
    <Header
      onRefresh={noop}
      onClose={noop}
      {...props}
    />
  );
}

describe('<Header />', () => {
  describe('<Controls />', () => {
    it('should use `props.onRefresh`', () => {
      const onRefresh = function () {};
      const wrapper = shallow(factory({ onRefresh }));
      const controls = wrapper.find('Controls');
      expect(onRefresh).to.equal(controls.prop('onRefresh'));
    });

    it('should use `props.onClose`', () => {
      const onClose = function () {};
      const wrapper = shallow(factory({ onClose }));
      const controls = wrapper.find('Controls');
      expect(onClose).to.equal(controls.prop('onClose'));
    });
  });
});
