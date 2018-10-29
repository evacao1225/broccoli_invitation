import React from 'react';
import { shallow, render, mount } from 'enzyme';
import 'jest-enzyme';
import Main from '../client/Main';
import RequestInvitationModal from '../client/requestInvitation/requestInvitationModal';

it('renders without crashing', () => {
	const main = shallow(<Main />);
	expect(main).toContainReact(<RequestInvitationModal />);
});
