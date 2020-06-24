const fs = require('fs');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();

const twitterAPI = require('./api/twitter');
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

var httpServer = http.createServer(app);
var httpsServer = https.createServer({
  key: fs.readFileSync('./privatekey.pem'),
  cert: fs.readFileSync('./server.crt')
}, app);

httpServer.listen(8080);
httpsServer.listen(443);
