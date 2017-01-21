'use strict';

const mongoose = require('mongoose');
const config = require('config');

mongoose.connect(config.get('dbUrl'));

module.exports = mongoose;
