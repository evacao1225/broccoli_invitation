import React from 'react';
import { shallow, render, mount } from 'enzyme';
import 'jest-enzyme';
import RequestInvitationModal from '../client/requestInvitation/requestInvitationModal';
import Input from '../client/common/Input';

let RequestModal;

beforeAll(() => {
	// mount request modal
	RequestModal = mount(<RequestInvitationModal />);
});

describe('test request modal', () => {
	it('renders with button', () => {
		expect(RequestModal.find('button')).toHaveHTML('<button type="button" class="btn btn-success">Send an invite</button>');
	});

	it('input elements rendered after clicking', () => {
		//const RequestModal = mount(<RequestInvitationModal />);
		RequestModal.find('button').simulate('click');
		expect(RequestModal.find('input').length).toBe(3);
	});

	it('error occorred after clicking "Send" button', () => {
		// no input and click send button directly
		RequestModal.find('.modal-footer').find('button').simulate('click');
		let helpMsgEl = RequestModal.find('.help-msg');
		expect(helpMsgEl.length).toBe(4);
		helpMsgEl.forEach((node, index) => {
			if(index < 3) {
				expect(node.text()).not.toBe('');
			}else{
				expect(node.text()).toBe('');
			}
		});
	});
});

describe('test api call', () => {
	
});
