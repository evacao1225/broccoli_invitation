import React, { Component } from 'react';
import './styles/main.css';
import { Button } from 'react-bootstrap';
import RequestInvitationModal from './requestInvitation/requestInvitationModal';
//import { Grid, Row, Col } from 'react-bootstrap';

class Main extends Component {
	render() {
		return (
			<div className="main">
				<div className="main-welcome">
					<h1>A better way</h1>
					<h1>to enjoy every day.</h1>
				</div>
				<p><small>Be the first to know when we launch</small></p>
				<RequestInvitationModal />
			</div>
		);
	}
}

export default Main;
