var intergerSerial = require('./integer/serial.js');
var intergerRandom = require('./integer/random.js');

var dateSerial = require('./date/serial.js');
var dateRandom = require('./date/random.js');

var stringPattern = require('./string/pattern.js');

var listSerial = require('./list/serial.js');
var listRandom = require('./list/random.js');

// define an abstract generation type
// this is for the gen engine to determine if the current object is a gentype
var AbstractType = {
    __GEN_TYPE_IND: null
};

module.exports = {
    integer: {
        serial: intergerSerial,
        random: intergerRandom
    },
    date: {
        serial: dateSerial,
        random: dateRandom
    },
    string: {
        pattern: stringPattern
    },
    list: function (list) {
        return {
            random: listRandom,
            serial: listSerial
        }
    }
};