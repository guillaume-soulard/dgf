var check = require('check-type');
var extend = require('extend');
var random = require('random-js');

var AbstractType = require('../abstract.js');
var utils = require('../../utils.js');

module.exports = function (options) {
    
    if (!check(options).has('from') && !check(options).has('to')) {
        throw new Error('Options for integer.random must match {from:integer,to:integer}');
    }

    return extend({}, AbstractType, {
        min: options.from,
        max: options.to,
        engine: null,
        distribution: null,
        
        getValue: function (model) {
            
            if (this.engine == null) {
                this.engine = utils.newEngineByModel(model);                
            }
            
            if (this.distribution == null) {
                
                this.distribution = random.integer(this.min, this.max);
            }
            
            return this.distribution(this.engine);
        }
    });
};