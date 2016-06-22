'use babel';

import React from 'react';
import {shallow} from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Header from '../../lib/components/Header';

chai.should();
chai.use(sinonChai);

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

describe.only('<Header />', () => {
  describe('<Controls />', () => {
    it('should use `props.onRefresh`', () => {
      const onRefresh = function () {};
      const wrapper = shallow(factory({ onRefresh }));
      const controls = wrapper.find('Controls');
      expect(onRefresh).to.equal(controls.prop('onRefresh'));
    });

    it('should use `props.onRefresh`', () => {
      const onRefresh = function () {};
      const wrapper = shallow(factory({ onRefresh }));
      const controls = wrapper.find('Controls');
      expect(onRefresh).to.equal(controls.prop('onRefresh'));
    });
  });
});
