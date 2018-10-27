import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const axiosClient = axios.create({
	headers: {
		'Accept': 'application/json'
	}
});

const api = "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth";
const app = express();
console.log(`api: ${api}`);
app.use('/requestInvitation', requestInvitation);
