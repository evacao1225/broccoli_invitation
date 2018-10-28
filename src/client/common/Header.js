import React, {Component} from 'react';
import { PageHeader } from 'react-bootstrap';
import '../styles/header.css';

class Header extends Component {
	render() {
		return (
			<PageHeader bsClass="my-page-header">
				BROCCOLI & CO.
			</PageHeader>
		);
	}
}

export default Header;
