'use babel';

import React from 'react';
import {shallow} from 'enzyme';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Search from '../../lib/components/Search';

chai.should();
chai.use(sinonChai);

function factory(props) {
  function noop() {}
  return (
    <Search
      onChange={ noop }
      {...props}
    />
  );
}

describe('<Search />', () => {
  it('should fire onChange when text is entered', () => {
    const spy = sinon.spy();
    const wrapper = shallow(factory({ onChange: spy }));
    const newValue = 'hello';
    wrapper.simulate('change', newValue);
    spy.should.have.been.calledWith(newValue);
  });
});
