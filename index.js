const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const twitterAPI = require('./api/twitter');
const port = 8000;

// Body parser middleware

app.use(bodyParser.json());

app.use(function (req, res, next) {
	bodyParser.urlencoded({
		extended: false
	});
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use('/twitter', twitterAPI);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
