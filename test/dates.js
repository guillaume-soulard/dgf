var dgf = require('../');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('dgf.type.date', function () {
   
    describe('#serial', function () {
    
        it ('should create date type generator', function () {
           
            var dateType = dgf.types.date.serial({
                from: new Date(2016, 0, 1, 0, 0, 0, 0),
                next: {
                    interval: 'day',
                    increment: 1
                }
            });
            
            assert.isNotNull(dateType);
            assert.property(dateType, '__GEN_TYPE_IND');
            assert.isFunction(dateType.getValue);
        });
        
        it ('should not create date type because options are missing', function () {
           
            // missing from 
            expect(function () {
                
                var dateType = dgf.types.date.serial({
                    next: {
                        interval: 'day',
                        increment: 1
                    }
                });
            }).to.throw(Error, 'Options for date.serial must match {from:date,to:date (default: infinity),next{interval:"year"|"month"|"day"|"hour"|"minute"|"second",increment:integer},cycle:boolean (default: true)}');
            
            // Missing next
            expect(function () {
                
                var dateType = dgf.types.date.serial({
                    from: new Date(2016, 0, 1, 0, 0, 0, 0)
                });
            }).to.throw(Error, 'Options for date.serial must match {from:date,to:date (default: infinity),next{interval:"year"|"month"|"day"|"hour"|"minute"|"second",increment:integer},cycle:boolean (default: true)}');
            
            // missing interval
            expect(function () {
                
                var dateType = dgf.types.date.serial({
                    from: new Date(2016, 0, 1, 0, 0, 0, 0),
                    next: {
                        increment: 1
                    }
                });
            }).to.throw(Error, 'Options for date.serial must match {from:date,to:date (default: infinity),next{interval:"year"|"month"|"day"|"hour"|"minute"|"second",increment:integer},cycle:boolean (default: true)}');
            
            // missing increment
            expect(function () {
                
                var dateType = dgf.types.date.serial({
                    from: new Date(2016, 0, 1, 0, 0, 0, 0),
                    next: {
                        interval: 'day'
                    }
                });
            }).to.throw(Error, 'Options for date.serial must match {from:date,to:date (default: infinity),next{interval:"year"|"month"|"day"|"hour"|"minute"|"second",increment:integer},cycle:boolean (default: true)}');
        });
        
        it ('should not create date type because from options are not in correct type', function () {
           
            expect(function () {
                
                var dateType = dgf.types.date.serial({
                    from: 1,
                    next: {
                        interval: 'day',
                        increment: 1
                    }
                });
            }).to.throw(Error, 'from is not a date');
            
            expect(function () {
                
                var dateType = dgf.types.date.serial({
                    from: new Date(2016, 0, 1, 0, 0, 0, 0),
                    next: {
                        interval: 1,
                        increment: 1
                    }
                });
            }).to.throw(Error, 'next.interval is not a string');
            
            expect(function () {
                
                var dateType = dgf.types.date.serial({
                    from: new Date(2016, 0, 1, 0, 0, 0, 0),
                    next: {
                        interval: 'test',
                        increment: 1
                    }
                });
            }).to.throw(Error, 'next.interval value is incorrect : "test". Expected "year" or "month" or"day" or "hour" or "minute" or "second" or "millisecond"');
            
            expect(function () {
                
                var dateType = dgf.types.date.serial({
                    from: new Date(2016, 0, 1, 0, 0, 0, 0),
                    next: {
                        interval: 'day',
                        increment: 'test'
                    }
                });
            }).to.throw(Error, 'next.increment is not a number');
        });
        
        it ('should create date type generator', function () {
           
            var dateType = dgf.types.date.serial({
                from: new Date(2016, 0, 1, 0, 0, 0, 0),
                next: {
                    interval: 'day',
                    increment: 1
                }
            });
            
            assert.isNotNull(dateType);
            assert.property(dateType, '__GEN_TYPE_IND');
            assert.isFunction(dateType.getValue);
        });
        
        it ('should return next date in order', function () {
           
            var dateType = dgf.types.date.serial({
                from: new Date(2016, 0, 1, 0, 0, 0, 0),
                next: {
                    interval: 'day',
                    increment: 1
                }
            });
            
            var model = dgf.newModel();
            
            var date1 = dateType.getValue(model);
            var date2 = dateType.getValue(model);
            var date3 = dateType.getValue(model);
            
            assert.equal(date1.getTime(), new Date(2016, 0, 1, 0, 0, 0, 0).getTime());
            assert.equal(date2.getTime(), new Date(2016, 0, 2, 0, 0, 0, 0).getTime());
            assert.equal(date3.getTime(), new Date(2016, 0, 3, 0, 0, 0, 0).getTime());
        });
        
        
        it ('should return next date in order and throw error when out of range', function () {
           
            var dateType = dgf.types.date.serial({
                from: new Date(2016, 0, 1, 0, 0, 0, 0),
                to: new Date(2016, 0, 5, 0, 0, 0, 0),
                next: {
                    interval: 'day',
                    increment: 1
                },
                cycle: false
            });
            
            var model = dgf.newModel();
            
            var date1 = dateType.getValue(model);
            var date2 = dateType.getValue(model);
            var date3 = dateType.getValue(model);
            var date4 = dateType.getValue(model);
            var date5 = dateType.getValue(model);
            
            assert.equal(date1.getTime(), new Date(2016, 0, 1, 0, 0, 0, 0).getTime());
            assert.equal(date2.getTime(), new Date(2016, 0, 2, 0, 0, 0, 0).getTime());
            assert.equal(date3.getTime(), new Date(2016, 0, 3, 0, 0, 0, 0).getTime());
            assert.equal(date4.getTime(), new Date(2016, 0, 4, 0, 0, 0, 0).getTime());
            assert.equal(date5.getTime(), new Date(2016, 0, 5, 0, 0, 0, 0).getTime());
            
            expect(function () {
                
                dateType.getValue(model);
                
            }).to.throw(Error, 'Max increment. Add cycle: true to allow reloop');
            
        });
    });
    
    describe('#random', function () {
       
        it ('should assert parameters are correct', function () {
           
            var dateType = dgf.types.date.random({
                from: new Date(2016, 0, 1, 0, 0, 0, 0),
                to: new Date(2016, 0, 5, 0, 0, 0, 0),
                interval: 'day'
            });
            
            assert.isNotNull(dateType);
            assert.property(dateType, '__GEN_TYPE_IND');
            assert.isFunction(dateType.getValue);
        });
    });
});