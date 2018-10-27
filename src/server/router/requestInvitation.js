import express from 'express';

const router = express.Router();

router.post('/requestInvitation', function(req, res) {
	console.log("req.body: "+req.body);
	let result = await axiosClient.post(api, req.body, { headers: {
		{'referer': req.get('referer')}}});
	console.log('result: '+result.data);
	res.json(JSON.parse({result: result.data}));
});

module.exports = router;
