import React, {Component} from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faGrinHearts } from '@fortawesome/free-solid-svg-icons';
import '../styles/footer.css';

class Footer extends Component {
	render() {
		return (
			<Grid bsClass="pd2-tb page-footer">
				<Row>
					<Col md={5}>
						<div>
							<p>Made with <FontAwesomeIcon icon={faHeart} color="red"/> in Melbourne</p>
						</div>
					</Col>
					<Col md={2}>
						<div className="glow">
							<FontAwesomeIcon icon={faGrinHearts} color="red" size="2x"/>
						</div>
					</Col>
					<Col md={5}>
						<div>
							<p>&copy; 2016 Broccoli & Co. All rights reserved</p>
						</div>
					</Col>
			</Row>
			</Grid>
		);
	}
}

export default Footer;
