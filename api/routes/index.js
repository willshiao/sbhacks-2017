'use strict';

const router = require('express').Router();
const Seller = require('../models/Seller');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/sellers', (req, res) => {
  Seller.find().lean().exec()
    .then(data => {
      res.json(data);
    });
});

router.post('/sellers', (req, res) => {

});

module.exports = router;
