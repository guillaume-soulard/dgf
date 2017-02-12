var check = require('check-type');
var objectPath = require('object-path');

var utils = require('../utils.js');

var csv = require('./impl/csv.js');
var json = require('./impl/json.js');

module.exports = {
    csv: csv,
    json: json
};