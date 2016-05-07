var check = require('check-type');
var extend = require('extend');
var random = require('random-js');

var AbstractType = require('../abstract.js');
var utils = require('../../utils.js');

module.exports = function (options) {
        
    if (!check(options).has('from')
        || !check(options).has('interval') 
        || !check(options).has('to')) {
        
        throw new Error('Options for date.serial must match {from:date,to:date,interval:"year"|"month"|"day"|"hour"|"minute"|"second"}');
    } else {
        
        if (!check(options.from).is('date')) {
            
            throw new Error('from is not a date');
        }
        
        if (!check(options.to).is('date')) {
            
            throw new Error('to is not a date');
        }
        
        if (!check(options.interval).is('string')) {
            
            throw new Error('next.interval is not a string');
        }
        
        if (options.interval.toLowerCase() != 'year'
           && options.interval.toLowerCase() != 'month'
           && options.interval.toLowerCase() != 'day'
           && options.interval.toLowerCase() != 'hour'
           && options.interval.toLowerCase() != 'minute'
           && options.interval.toLowerCase() != 'second'
           && options.interval.toLowerCase() != 'millisecond') {
            
            throw new Error('next.interval value is incorrect : "' + options.interval + '". Expected "year" or "month" or"day" or "hour" or "minute" or "second" or "millisecond"');
        }
        
        if (!check(options).has('format')) {
            options.format = null;
        }
    }
    
    return extend({}, AbstractType, {        

        min: options.from,
        max: options.to,
        interval: options.interval.toLowerCase(),
        engine: null,
        distribution: null,
        format: options.format,
        
        getValue: function (model) {
                
            if (this.engine == null
                && this.distribution == null) {
                this.engine = utils.newEngineByModel(model);
                this.distribution = random.date(this.min, this.max);
            }
            
            if (this.format == null) {
                this.format = model.settings.defaultDateFormat;
            }
            
            return utils.formatDate(this.distribution(this.engine), this.format);
        }
    });   
};

// TODO utils
function incrementDateBy (date, interval, increment) {
    
    return new Date(
        interval == 'year' ? date.getFullYear() + increment : date.getFullYear(),
        interval == 'month' ? date.getMonth() + increment : date.getMonth(),
        interval == 'day' ? date.getDate() + increment : date.getDate(),
        interval == 'hour' ? date.getHours() + increment : date.getHours(),
        interval == 'minute' ? date.getMinutes() + increment : date.getMinutes(),
        interval == 'second' ? date.getSeconds() + increment : date.getSeconds(),
        interval == 'millisecond' ? date.getMilliseconds() + increment : date.getMilliseconds()
    );
}