'use strict';

const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/:pageName', (req, res) => {
  try{
    console.log('Loading page: ', path.join('pages/', req.params.pageName + '.html'));
    fs.createReadStream(path.join('pages/', req.params.pageName + '.html'))
      .pipe(res);
  } catch(err) {
    return res.json({error: err});
  }
});

module.exports = router;
