const webpush = require('web-push');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Database
const mongoose = require('mongoose');
const dbConfig = require('./config/database');

// Routes
const headers = require('./routes/headers');
const subscriptionRouter = require('./routes/subscription');
const messageRouter = require('./routes/message');

mongoose.connect(dbConfig.url)
  .then(() => console.log('connected to database'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let subs = [];

// Add headers
app.use(headers.setHeaders);

// Routing
app.use('/subscription', subscriptionRouter);
app.use('/message', messageRouter);

const server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});

