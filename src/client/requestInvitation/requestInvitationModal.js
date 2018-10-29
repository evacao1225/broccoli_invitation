import React, { Component } from 'react';
import { Modal, Button, HelpBlock, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/requestInvitation.css';
import Input from '../common/Input.js';
import Client from '../util/client';

const RESULT = {success: "success", warning: "warning", error: "error", null: null};
const API = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';
class RequestInvitationModal extends Component {
	constructor(props) {
		super(props);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.getNameValidationState = this.getNameValidationState.bind(this);
		this.getEmailValidationState = this.getEmailValidationState.bind(this);
		this.getConfirmEmailValidationState = this.getConfirmEmailValidationState.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleConfirmEmailChange = this.handleConfirmEmailChange.bind(this);

		this.state = {
			show: false,
			done: false,
			name: '',
			email: '',
			emailConfirmed: '',
			buttonMsg: 'Send',
			disabled: false,
			name: '',
			email: '',
			emailConfirmed: ''
		};

		this.validateResult = {
			name: {valid: false, helpMsg: ''},
			email: {valid: false, helpMsg: ''},
			emailConfirmed: {valid: false, helpMsg: ''}
		};

		// to store api error
		this.errorMsg = '';
		this.emailValidator = new RegExp(/^[a-zA-Z0-9.!#'$%&*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
	}

	handleShow() {
		this.setState({ show: true });
	}

	handleClose() {
		this.setState({
			show: false,
			done: false,
			name: '',
			email: '',
			emailConfirmed: '',
			buttonMsg: 'Send',
			disabled: false
	 });
	}

	handleClick() {
		const _self = this;
		if(this.validateResult.name.valid &&
			this.validateResult.email.valid &&
			this.validateResult.emailConfirmed.valid) {
			// values of three inputs are all valid, hence no need to show help msg
			this.validateResult.name.helpMsg = '';
			this.validateResult.email.helpMsg = '';
			this.validateResult.emailConfirmed.helpMsg = '';

			// using ajax to access server
			let body = {
				name: this.state.name,
				email: this.state.email
			};
			Client.post(API, body)
			.then((response) => {
				if(response.status !== 200 && response.status !== 202) {
					// error occurred
					_self.errorMsg = response.data;
					_self.setState({
						buttonMsg: 'Send',
						disabled: false
					});
				}else{
					// success and display OK button and notification
					_self.setState({
						done: true
					});
				}
			})
			.catch((error) => {
				_self.errorMsg = error.message;
				_self.setState({
					buttonMsg: 'Send',
					disabled: false,
				});
			});
			this.setState({
				buttonMsg: 'Sending, please wait...',
			 	disabled: true
			});
		}else{
			if(!this.validateResult.name.valid) {
				this.validateResult.name.helpMsg = 'Name must be at least three charactors long.';
			}
			if(!this.validateResult.email.valid) {
				this.validateResult.email.helpMsg = 'Email format is incorrect.';
			}
			if(!this.validateResult.emailConfirmed.valid){
				this.validateResult.emailConfirmed.helpMsg = 'Confirmed email must be the same with email.';
			}
			this.forceUpdate();
		}
	}

	handleNameChange(name) {
		// check if name is valid
		this.getNameValidationState(name);
		// update name in state
		this.setState({name: name || ''});
	}

	handleEmailChange(email) {
		// check if email is valid
		this.getEmailValidationState(email);
		this.getConfirmEmailValidationState(this.state.emailConfirmed, email);
		this.setState({ email: email || '' });
	}

	handleConfirmEmailChange(emailConfirmed) {
		// check if email confirmed is valid
		this.getConfirmEmailValidationState(emailConfirmed);
		this.setState({ emailConfirmed: emailConfirmed || '' });
	}

	/*
	check if name is at least three characters long
	*/
	getNameValidationState(value) {
		const nameLength = value.length;
		let result = (nameLength >= 3) ? RESULT.success :
			((nameLength <= 0) ? RESULT.null : RESULT.error);
		this.validateResult.name.valid = result === RESULT.success;
		if(result === RESULT.error) {
			this.validateResult.name.helpMsg = 'Name must be at least three charactors long.';
		}else{
			this.validateResult.name.helpMsg = '';
		}
		return result;
	}

	getEmailValidationState(email=this.state.email) {
		let result = this.emailValidator.test(email) ? RESULT.success :
			(email === '' ? RESULT.null : RESULT.error);
		this.validateResult.email.valid = result === RESULT.success;
		if(result === RESULT.error) {
			this.validateResult.email.helpMsg = 'Email format is incorrect.';
		}else{
			this.validateResult.email.helpMsg = '';
		}
		return result;
	}

	/*
	check if email is validation email format
	*/
	getConfirmEmailValidationState(emailConfirmed=this.state.emailConfirmed, email=this.state.email) {
		let result = email === emailConfirmed ? (email === '' ? RESULT.null : RESULT.success) : RESULT.error;
		this.validateResult.emailConfirmed.valid = result === RESULT.success;
		if(result === RESULT.error) {
			this.validateResult.emailConfirmed.helpMsg = 'Confirmed email must be the same with email.';
		}else{
			this.validateResult.emailConfirmed.helpMsg = '';
		}
		return result;
	}

	render() {
		console.log(`********** rendering: ${this.validateResult.email.helpMsg}`);
		return (
			<div id="requestInvite" className="pd1-tb">
				<Button bsStyle="success" onClick={this.handleShow}>Send an invite</Button>
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>
							{!this.state.done ? "Request an Invitation" : "All done!"}
						</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form>
							{!this.state.done &&
								<Input chartId="nameOfRequestInvite"
									getValidationState={this.getNameValidationState}
									type="text"
									placeholder="Full name"
									helpMsg={this.validateResult.name.helpMsg}
									storeChange={this.handleNameChange}
								/>
							}
							{!this.state.done &&
								<Input chartId="emailOfRequestInvite"
									getValidationState={this.getEmailValidationState}
									type="email"
									placeholder="Email"
									helpMsg={this.validateResult.email.helpMsg}
									storeChange={this.handleEmailChange}
								/>
							}
							{!this.state.done &&
								<Input chartId="confirmEmailOfRequestInvite"
									getValidationState={this.getConfirmEmailValidationState}
									type="email"
									placeholder="Email"
									helpMsg={this.validateResult.emailConfirmed.helpMsg}
									storeChange={this.handleConfirmEmailChange}
								/>
							}
							{ this.state.done &&
								<Alert bsStyle="info" bsClass="center">
									<h4>Congratulations!</h4>
									<p>You will be one of the first to experience</p>
									<p>Broccoli & Co. when we launch.</p>
								</Alert>
							}
					</form>
				</Modal.Body>
				<Modal.Footer>
				{ !this.state.done &&
					<Button bsStyle="success" onClick={this.handleClick} disabled={this.state.disabled} block>{this.state.buttonMsg}</Button>
				}
				{ this.state.done &&
					<Button bsStyle="success" onClick={this.handleClose} block>OK</Button>
				}
					<HelpBlock bsClass="help-msg">{this.errorMsg}</HelpBlock>
				</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default RequestInvitationModal;
