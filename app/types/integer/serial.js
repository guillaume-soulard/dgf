var check = require('check-type');
var extend = require('extend');

var AbstractType = require('../abstract.js');

module.exports = function (options) {

    if (!check(options).has('from')) {
        throw new Error('Options for integer.serial must match {from:integer,to:integer (default: infinity),next:integer (default: 1),cycle:boolean (default: true)}');
    }

    if (!check(options).has('to')) {
        options.to = null;
    }

    if (!check(options).has('next')) {
        options.next = 1;
    }

    if (!check(options).has('cycle')) {
        options.cycle = true;
    }

    return extend({}, AbstractType, {
        min: options.from,
        max: options.to,
        current: options.from,
        increment: options.next,
        doCycle: options.cycle,

        getValue: function (model) {
            var toReturn = this.current;

            if (this.max != null 
                    && this.current + this.increment > this.max + 1
                    && !this.doCycle) {
                throw new Error('Max increment. Add cycle: true to allow reloop');
            } else if (this.max != null 
                    && this.current + this.increment > this.max 
                    && this.doCycle) {
                // reloop if cycle = true
                this.current = this.min;
            } else {
                this.current = this.current + this.increment;                            
            }                     

            return toReturn;
        }
    });
};