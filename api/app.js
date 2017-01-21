'use strict';

const express = require('express');
const config = require('config');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();

const db = require('./lib/db');

const indexRoutes = require('./routes/index');
const pageRoutes = require('./routes/pages');

app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use('/', indexRoutes);
app.use('/pages', pageRoutes);
app.use(express.static('public'));

app.listen(config.get('port'), () => {
  console.log('App listening on port ' + config.get('port'));
});
