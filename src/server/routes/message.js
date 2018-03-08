const express = require('express');
const router = express.Router();
const Search = require('../models/Search');


const messageService = require('../services/message.service');

router.get('/send-to-all', function(req, res) {
  Search.find(function(err, searches) {
    if (err)
      res.send(err);

    let searchPromises = []

    searches.forEach(search => {
      searchPromises.push(messageService.sendMessage(search.pushSubscription));
    });

    Promise.all(searchPromises)
      .then(result => {
        res.json({ result: result });
      })
  });
});

module.exports = router;
