'use strict';

const express = require('express');
const config = require('config');
const app = express();

const db = require('./lib/db');

const indexRoutes = require('./routes/index');
const pageRoutes = require('./routes/pages');

app.use('/', indexRoutes);
app.use('/pages', pageRoutes);

app.listen(config.get('port'), () => {
  console.log('App listening on port ' + config.get('port'));
});
