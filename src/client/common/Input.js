import React, { Component } from 'react';
import { FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

class Input extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.getValidationState = this.getValidationState.bind(this);
	}

	getValidationState() {
		if(this.props.getValidationState) {
			return this.props.getValidationState(this.state.value);
		}
		return null;
	}

	handleChange(e) {
		this.setState({ value: e.target.value || '' });
		if(this.props.storeChange) {
			this.props.storeChange(e.target.value);
		}
	}

	render() {
		console.log('input rendering');
		return (
			<FormGroup
				controlId={this.props.controlId}
				validationState={this.getValidationState()}
			>
				<FormControl
					type={this.props.type}
					value={this.state.value}
					placeholder={this.props.placeholder}
					onChange={this.handleChange}
					required
				/>
				<FormControl.Feedback />
				<HelpBlock bsClass="help-msg">{this.props.helpMsg}</HelpBlock>
			</FormGroup>
		);
	}
}

export default Input;
