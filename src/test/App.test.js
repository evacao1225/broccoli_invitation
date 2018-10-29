import React from 'react';
import { shallow, render } from 'enzyme';
import 'jest-enzyme';
import App from '../client/App';
import Header from '../client/common/Header';
import Footer from '../client/common/Footer';
import Main from '../client/Main';

it('renders without crashing', () => {
  const wrapper = shallow(<App />);
	expect(wrapper).toContainReact(<Header />);
	expect(wrapper).toContainReact(<Footer />);
	expect(wrapper).toContainReact(<Main />);
});
