var check = require('check-type');
var extend = require('extend');

var AbstractType = require('../abstract.js');

module.exports = function (options) {
        
    if (!check(options).has('from')
        || !check(options).has('next') 
        || !check(options).has('next.interval') 
        || !check(options).has('next.increment')) {
        
        throw new Error('Options for date.serial must match {from:date,to:date (default: infinity),next{interval:"year"|"month"|"day"|"hour"|"minute"|"second",increment:integer},cycle:boolean (default: true)}');
    } else {
        
        if (!check(options.from).is('date')) {
            
            throw new Error('from is not a date');
        }
        
        if (!check(options.next.interval).is('string')) {
            
            throw new Error('next.interval is not a string');
        }
        
        if (!check(options.next.increment).is('number')) {
            
            throw new Error('next.increment is not a number');
        }
        
        if (options.next.interval.toLowerCase() != 'year'
           && options.next.interval.toLowerCase() != 'month'
           && options.next.interval.toLowerCase() != 'day'
           && options.next.interval.toLowerCase() != 'hour'
           && options.next.interval.toLowerCase() != 'minute'
           && options.next.interval.toLowerCase() != 'second'
           && options.next.interval.toLowerCase() != 'millisecond') {
            
            throw new Error('next.interval value is incorrect : "' + options.next.interval + '". Expected "year" or "month" or"day" or "hour" or "minute" or "second" or "millisecond"');
        }
    }

    if (!check(options).has('to')) {
        options.to = null;
    }
    
    if (!check(options).has('cycle')) {
        options.cycle = true;
    }

    return extend({}, AbstractType, {        

        min: options.from,
        max: options.to,
        next: options.from,
        interval: options.next.interval.toLowerCase(),
        increment: options.next.increment,
        doCycle: options.cycle,
        
        getValue: function (model) {
            
            var valueToReturn = this.next;            
            var futureValue = incrementDateBy(this.next, this.interval, this.increment);            
            
            var maxPlusOneIncrement = null;
            
            if (this.max != null) {
                
                maxPlusOneIncrement = incrementDateBy(this.max, this.interval, this.increment);
            }
            
            if (maxPlusOneIncrement != null 
                && futureValue.getTime() > maxPlusOneIncrement.getTime()
                && !this.doCycle) {
                                
                throw new Error('Max increment. Add cycle: true to allow reloop');
            } else if (maxPlusOneIncrement != null 
                        && futureValue.getTime() > maxPlusOneIncrement.getTime()
                        && this.doCycle) {
                
                this.next = this.min;
            } else {                
                
                this.next = futureValue;
            }
            
                
            return valueToReturn;
        }
    });   
};

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