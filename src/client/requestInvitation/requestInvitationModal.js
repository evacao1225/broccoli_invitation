import React, { Component } from 'react';
import { Modal, Button, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import '../styles/requestInvitation.css';
import Client from '../util/client';

const RESULT = {success: "success", warning: "warning", error: "error", null: null};
class RequestInvitationModal extends Component {
	constructor(props) {
		super(props);

		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.getNameValidationState = this.getNameValidationState.bind(this);
		this.getConfirmEmailValidationState = this.getConfirmEmailValidationState.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleConfirmEmailChange = this.handleConfirmEmailChange.bind(this);

		this.state = {
			show: false,
			name: '',
			email: '',
			emailConfirmed: '',
			buttonMsg: 'Send',
			disabled: false
		};

		this.helpMsg = '';
		this.nameValid = false;
		this.emailValid = false;
		this.emailConfirmedValid = false;
		this.emailValidator = new RegExp(/^[a-zA-Z0-9.!#'$%&*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
	}

	handleShow() {
		this.setState({ show: true });
	}

	handleClose() {
		this.setState({
			show: false,
			name: '',
			email: '',
			emailConfirmed: '',
			buttonMsg: 'Send',
			disabled: false
	 });
	}

	handleClick() {
		const _self = this;
		if(this.nameValid && this.emailValid && this.emailConfirmedValid) {
			this.helpMsg = '';
			// using ajax to access server
			let body = {
				name: this.state.name,
				email: this.state.email
			};
			Client.post('/requestInvitation', body)
			.then((response) => {
				_self.setState({
					buttonMsg: 'Send',
					disabled: false
				});
				if(response.status !== 200 && response.status !== 202) {
					// display error msg
				}
			})
			.catch((error) => {
				_self.helpMsg = error.message;
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
			if(!this.nameValid) {
				this.helpMsg = 'Name must be at least three charactors long.';
			}else if(!this.emailValid) {
				this.helpMsg = 'Email format is incorrect.';
			}else {
				this.helpMsg = 'Confirmed email must be the same with email.';
			}
			this.setState({
				buttonMsg: 'Send',
				disabled: false
			});
		}
	}

	handleNameChange(e) {
		this.setState({ name: e.target.value || '' });
	}

	handleEmailChange(e) {
		this.setState({ email: e.target.value || '' });
	}

	handleConfirmEmailChange(e) {
		this.setState({ emailConfirmed: e.target.value || '' });
	}

	/*
	check if name is at least three characters long
	*/
	getNameValidationState() {
		const nameLength = this.state.name.length;
		let result = (nameLength >= 3) ? RESULT.success :
			((nameLength <= 0) ? RESULT.null : RESULT.error);
		this.nameValid = result === RESULT.success;
		if(result === RESULT.error) {
			this.helpMsg = 'Name must be at least three charactors long.';
		}else{
			this.helpMsg = '';
		}
		return result;
	}

	getEmailValidationState() {
		const email = this.state.email;
		let result = this.emailValidator.test(email) ? RESULT.success :
			(email === '' ? RESULT.null : RESULT.error);
		this.emailValid = result === RESULT.success;
		if(result === RESULT.error) {
			this.helpMsg = 'Email format is incorrect.';
		}else{
			this.helpMsg = '';
		}
		return result;
	}

	/*
	check if email is validation email format
	*/
	getConfirmEmailValidationState() {
		const email = this.state.email;
		const emailConfirmed = this.state.emailConfirmed;
		let result = email === emailConfirmed ? (email === '' ? RESULT.null : RESULT.success) : RESULT.error;
		this.emailConfirmedValid = result === RESULT.success;
		if(result === RESULT.error) {
			this.helpMsg = 'Confirmed email must be the same with email.';
		}else{
			this.helpMsg = '';
		}
		return result;
	}

	render() {
		return (
			<div id="requestInvite">
				<Button bsStyle="success" onClick={this.handleShow}>Send an invite</Button>
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Request an Invitation</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form>
							{/***** name input ****/}
							<FormGroup
								controlId="nameOfRequestInvite"
								validationState={this.getNameValidationState()}
							>
								<FormControl
									type="text"
									value={this.state.name}
									placeholder="Enter your name"
									onChange={this.handleNameChange}
									required
								/>
								<FormControl.Feedback />
							</FormGroup>
							{/***** email input ****/}
							<FormGroup
								controlId="emailOfRequestInvite"
								validationState={this.getEmailValidationState()}
							>
								<FormControl
									type="email"
									value={this.state.email}
									placeholder="Email"
									onChange={this.handleEmailChange}
									required
								/>
								<FormControl.Feedback />
							</FormGroup>
							{/***** confirmed email input ****/}
							<FormGroup
								controlId="confirmEmailOfRequestInvite"
								validationState={this.getConfirmEmailValidationState()}
							>
								<FormControl
									type="email"
									value={this.state.emailConfirmed}
									placeholder="Confirm email"
									onChange={this.handleConfirmEmailChange}
									required
								/>
								<FormControl.Feedback />
							</FormGroup>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle="success" onClick={this.handleClick} disabled={this.state.disabled} block>{this.state.buttonMsg}</Button>
					<HelpBlock bsClass="help-msg">{this.helpMsg}</HelpBlock>
				</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default RequestInvitationModal;
