'use strict';

const fs = require('fs');
const router = require('express').Router();
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const config = require('config');
const auth = require('basic-auth');
const _ = require('lodash');

const Seller = require('../models/Seller');

router.use(bodyParser.urlencoded({extended: true}));
// router.use(bodyParser.json());


router.get('/', (req, res) => {
  fs.createReadStream('pages/hackathon.html').pipe(res);
});

router.get('/sellers', (req, res) => {
  Seller.find().lean().exec()
    .then(data => {
      res.json(data);
    });
});

router.get('/sellers/:id', (req, res) => {
  Seller.find({_id: req.params.id}).lean().exec()
    .then(data => {
      res.json(data ? data[0] : []);
    });
});

router.delete('/sellers/:id', authenticate, (req, res) => {
  Seller.findByIdAndRemove(req.params.id).exec()
    .then(data => {
      res.json({success: true});
    })
    .catch(err => res.json({success: false, error: err}));
});

router.post('/sellers', authenticate, (req, res) => {
  new Seller({
    info: {
      Name: req.body.name,
      Address: req.body.address || 'None'
    },
    coords: [req.body.latitude, req.body.longitude]
  }).save()
    .then(() => {
      return res.json({success: true});
    })
    .catch(err => {
      return res.json({success: false, error: err});
    });
});

router.post('/sellers/bulk', authenticate, (req, res) => {
  Promise.all(
    _(req.body.bulk.split(/\r?\n/))
      .filter(s => s.trim().length > 0)
      .chunk(4)
      .map(c => {
        if(c.length < 4) return Promise.resolve();
        console.log('c:', c);
        return new Seller({
          info: {Name: c[0], Address: c[4]},
          coords: [c[1], c[2]]
        }).save();
      }))
    .then(() => {
      return res.json({success: true});
    })
    .catch(err => {
      return res.json({success: false, error: err});
    });
});

router.post('/sellers/addInventory', authenticate, (req, res) => {
  console.log('Finding seller with ID:', req.body.sellerId);
  Seller.findById(req.body.sellerId)
    .then(item => {
      if(!item.inventory) item.inventory = [];
      item.inventory.push({name: req.body.itemName, quantity: req.body.itemQuantity, unit: req.body.itemUnit});
      return item.save();
    }).then(() => {
      return res.json({success: true});
    });
});


function authenticate(req, res, next) {
  const credentials = auth(req);
  if(!credentials || credentials.name !== config.get('credentials.name')
    || credentials.pass !== config.get('credentials.pass')) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Mangement Console"');
    res.end('Access denied');
  } else {
    next();
  }
}

module.exports = router;
