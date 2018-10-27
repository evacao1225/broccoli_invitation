import axios from 'axios';

const client = axios.create({
	headers: {
		'Accept': 'application/json',
	},
	timeout: 800000
});

let Client = {
	post(url, body) {
		// return promise
		return client.post(url, body);
	}
}

export default Client;
