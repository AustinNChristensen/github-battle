import * as React from 'react';
import * as enzyme from 'enzyme';
import index from '../index';

it('renders', () => {
    const hello = enzyme.shallow(<div>Hello Friends!</div>);
    expect(hello,find(".greeting").text()).toEqual('Hello Friends!')
});