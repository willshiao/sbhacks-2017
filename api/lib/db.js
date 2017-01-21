'use strict';

const mongoose = require('mongoose');
const config = require('config');
const Promise = require('bluebird');

mongoose.Promise = Promise;
mongoose.connect(config.get('dbUrl'));

module.exports = mongoose;
