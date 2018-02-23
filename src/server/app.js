const webpush = require('web-push');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var subs = [];

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.post('/sub', (req, res) => {

  const sub = req.body;

  sendMessage(sub);

  res.json('message sent');
});

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});

// VAPID keys should only be generated only once.
const vapidKeys = { 
  publicKey: 'BNWXqFGkpYtqq6Rx3Gd8pRK6Wje7s289jPFvfyB6KjWZDEJGtKLhTe8Pax-gWfi5xqqDSwrJkMCSwbvyaN7-U7w',
  privateKey: 'NofXXuzXBl37J6eospxPAaA7v0S2LrZ0E6nwGS4-g2k' 
};

function sendMessage (sub) {
  console.log('sending message..');
  webpush.setGCMAPIKey('AIzaSyAP14UxZ_4cgGC4RFWFMFSib8TgmMtAJj4');
  webpush.setVapidDetails(
    'mailto:marcusklein@me.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );
  
  setTimeout(() => {
    webpush.sendNotification(sub, 'A fuckn message m8')
    .then((res) => {
      console.log(res);
    })
    .catch(err => console.error(err));
  }, 5000)
}
