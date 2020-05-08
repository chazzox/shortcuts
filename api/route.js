const express = require('express');
const request = require('request');
const app = express();
const router = express.Router();

const api_consumer = '42btAO9xT33VFtodktW3uFLvb';
router.post('/oauth1', (req, res) => {
	var options = {
		method: 'POST',
		url: 'https://api.twitter.com/oauth/request_token',
		headers: {
			oauth_callback: encodeURIComponent('http://81.156.117.239:3000/'),
			Authorization:
				'OAuth oauth_consumer_key="' +
				api_consumer +
				'",oauth_token="744992592803270660-TKcSDwRNoFEBIuV7CN8ue96t8rD2NFA",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1588899238",oauth_nonce="IpJ1vfdZXte",oauth_version="1.0",oauth_signature="8F2VJPqskN1%2BZBNBIGsOu6QTaco%3D"'
		}
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
		res.send(response.toJSON());
	});
});
router.post('/oauth2', (req, res) => {
	var options = {
		method: 'POST',
		url:
			'https://api.twitter.com/oauth/access_token?oauth_token=' +
			req.query.oauth_token +
			'&oauth_verifier=' +
			req.query.oauth_verifier
	};
	request(options, function (error, response) {
		if (error) throw new Error(error);
		res.send(response.toJSON());
	});
});

router.post('/getTimeLine', (req, res) => {
	console.log(req.query);
	var options = {
		method: 'GET',
		url: 'https://api.twitter.com/1.1/statuses/home_timeline.json',
		headers: {
			Authorization:
				'OAuth oauth_consumer_key="' +
				api_consumer +
				'",oauth_token="' +
				req.body.oauth_token +
				'",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1588907309",oauth_nonce="6qCw1ZBABTy",oauth_version="1.0",oauth_signature="iYZ1amFw74Ua4kJAXXbQeq%2BlLQQ%3D"'
		}
	};
	request(options, function (error, response) {
		try {
			res.send(response.toJSON());
		} catch (err) {
			console.log(err);
		}
	});
});

module.exports = router;
