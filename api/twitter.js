const express = require('express');
const router = express.Router();
const request = require('request');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');

const consumerKey = 'Y6hXLlxAJMogmAnGmE8ZRCFJu';
const consumerKeySecret = 'mtyUd8qfdzx2K5n1eM3bPhuw8B6IOZdQ2sBfP4eeKuNbjvLoV8';

const oauth = OAuth({
	consumer: {
		key: consumerKey,
		secret: consumerKeySecret
	},
	signature_method: 'HMAC-SHA1',
	hash_function(base_string, key) {
		return crypto.createHmac('sha1', key).update(base_string).digest('base64');
	}
});

router.post('/oauth1', (req, res) => {
	const request_data = {
		url: 'https://api.twitter.com/oauth/request_token',
		method: 'POST'
	};

	request(
		{
			url: request_data.url,
			method: request_data.method,
			headers: oauth.toHeader(oauth.authorize(request_data))
		},
		function (error, response) {
			if (error) throw new Error(error);
			res.send(response.toJSON());
		}
	);
});

router.post('/oauth2', (req, res) => {
	const request_data = {
		url:
			'https://api.twitter.com/oauth/access_token?oauth_token=' +
			req.query.oauth_token +
			'&oauth_verifier=' +
			req.query.oauth_verifier,
		method: 'POST'
	};
	request(
		{
			...request_data,
			headers: oauth.toHeader(
				oauth.authorize(request_data, {
					key: req.query.oauth_token
				})
			)
		},
		function (error, response) {
			if (error) throw new Error(error);
			res.send(response.toJSON());
		}
	);
});

router.post('/getTimeline', (req, res) => {
	const request_data = {
		url: 'https://api.twitter.com/1.1/statuses/home_timeline.json',
		method: 'GET'
	};
	request(
		{
			url: request_data.url,
			method: request_data.method,
			headers: oauth.toHeader(
				oauth.authorize(request_data, {
					key: req.query.oauth_token,
					secret: req.query.oauth_token_secret
				})
			)
		},
		function (error, response) {
			if (error) throw new Error(error);
			res.send({ ...JSON.parse(response.toJSON().body) });
		}
	);
});

module.exports = router;
