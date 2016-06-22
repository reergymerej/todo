import React from 'react';
import {shallow} from 'enzyme';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Controls from '../../lib/components/Controls';

chai.should();
chai.use(sinonChai);

function factory(props) {
  function noop() {}
  return (
    <Controls
      onRefresh={noop}
      onClose={noop}
      {...props}
    />
  );
}

describe('<Controls />', () => {
  describe('refresh button', () => {
    it('should trigger onRefresh', () => {
      const spy = sinon.spy();
      const wrapper = shallow(factory({
        onRefresh: spy,
      }));

      const btn = wrapper.find('.btn.icon-sync');
      btn.simulate('click');
      spy.should.have.been.called;
    });
  });

  describe('close button', () => {
    it('should trigger onClose', () => {
      const spy = sinon.spy();
      const wrapper = shallow(factory({
        onClose: spy,
      }));

      const btn = wrapper.find('.btn.icon-x');
      btn.simulate('click');
      spy.should.have.been.called;
    });
  });
});
