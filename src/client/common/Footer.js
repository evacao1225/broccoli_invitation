import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

class Footer extends Component {
	render() {
		return (
			<div className="page-footer">
				<p>Made with <FontAwesomeIcon icon={faHeart} color="red"/> in Melbourne</p>
				<p>&copy; 2016 Broccoli & Co. All rights reserved</p>
			</div>
		);
	}
}

export default Footer;
