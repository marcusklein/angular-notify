const express = require('express');
const router = express.Router();

const Search = require('../models/Search');

router.route('/')

  .get(function(req, res) {
    Search.find(function(err, searches) {
      if (err)
        res.send(err);

      res.json(searches);
    });
  })

  .post(function(req, res) {
    if (!req.body.searchUrl || !req.body.pushSubscription) {
      res.json({ message: 'please make sure both a searchUrl and pushSubscription are supplied' });
    } else {
      let search = new Search();
      search.searchUrl = req.body.searchUrl;
      search.pushSubscription = req.body.pushSubscription;

      // save the search and check for errors
      search.save(function(err) {
        if (err)
          res.send(err);

        res.json({
          message: 'Search created!',
          searchUrl: req.body.searchUrl,
          pushSubscription: req.body.pushSubscription
        });
      });
    }
});

router.route('/delete-all-please-i-know-what-im-doing')
  .get((req, res) => {
    Search.remove({}, err => {
      if (err)
        res.send(err);

      res.json({ message: 'removed all searches' });
    });
  });

module.exports = router;
