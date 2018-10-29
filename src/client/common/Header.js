import React, {Component} from 'react';
import { PageHeader } from 'react-bootstrap';
import '../styles/header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

class Header extends Component {
	render() {
		return (
			<PageHeader bsClass="my-page-header">
				<FontAwesomeIcon icon={faShoppingCart} color="green" />
				<span className="header-title">BROCCOLI & CO.</span>
			</PageHeader>
		);
	}
}

export default Header;
