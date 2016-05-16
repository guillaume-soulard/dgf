var check = require('check-type');
var extend = require('extend');
var random = require('random-js');
var utils = require('../utils.js');

var intergerSerial = require('./integer/serial.js');
var intergerRandom = require('./integer/random.js');

var dateSerial = require('./date/serial.js');
var dateRandom = require('./date/random.js');

var stringPattern = require('./string/pattern.js');

var arrayRandom = require('./array/random.js');

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
    array: {
        random: arrayRandom
    },
    list: function (list) {
        
        if (!Array.isArray(list)) {
            throw new Error('The argument must be an array');
        }
        
        return {
            array: list,
            
            random: function (options) {
                
                return extend({}, AbstractType, {
                    list: this.array,
                    
                    getValue: function (model) {

                        return random.pick(model.getEngine(), this.list);
                    }
                });                              
            },
            serial: function (options) {
    
                if (typeof(options) === 'undefined' ||
                    options == null) {
                    options = {
                        cycle: true
                    };
                }
                
                if (!check(options).has('cycle')) {
                    options.cycle = true;
                }
                
                return extend({}, AbstractType, {
                    list: this.array,
                    currentIndex: 0,
                    doCycle: options.cycle,

                    getValue: function (model) {
                        var toReturn = this.list[this.currentIndex];

                        if (this.currentIndex + 2 > this.list.length + 1
                                && !this.doCycle) {
                            throw new Error('Max increment. Add cycle: true to allow reloop');
                        } else if (this.currentIndex + 2 > this.list.length
                                && this.doCycle) {
                            // reloop if cycle = true
                            this.currentIndex = 0;
                        } else {
                            this.currentIndex = this.currentIndex + 1;                            
                        }                     

                        return toReturn;
                    }
                });
            }
        }
    }
};