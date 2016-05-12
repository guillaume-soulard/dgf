var dgf = require('../');
var chai = require('chai');
chai.use(require('chai-datetime'));
var assert = chai.assert;
var expect = chai.expect;

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
            }).to.throw(Error, 'Options for date.serial must match {from:date,to:date (default: infinity),next{interval:"year"|"month"|"day"|"hour"|"minute"|"second",increment:integer},cycle:boolean (default: true),format:string (default: mm-dd-yyyy)}');
            
            // Missing next
            expect(function () {
                
                var dateType = dgf.types.date.serial({
                    from: new Date(2016, 0, 1, 0, 0, 0, 0)
                });
            }).to.throw(Error, 'Options for date.serial must match {from:date,to:date (default: infinity),next{interval:"year"|"month"|"day"|"hour"|"minute"|"second",increment:integer},cycle:boolean (default: true),format:string (default: mm-dd-yyyy)}');
            
            // missing interval
            expect(function () {
                
                var dateType = dgf.types.date.serial({
                    from: new Date(2016, 0, 1, 0, 0, 0, 0),
                    next: {
                        increment: 1
                    }
                });
            }).to.throw(Error, 'Options for date.serial must match {from:date,to:date (default: infinity),next{interval:"year"|"month"|"day"|"hour"|"minute"|"second",increment:integer},cycle:boolean (default: true),format:string (default: mm-dd-yyyy)}');
            
            // missing increment
            expect(function () {
                
                var dateType = dgf.types.date.serial({
                    from: new Date(2016, 0, 1, 0, 0, 0, 0),
                    next: {
                        interval: 'day'
                    }
                });
            }).to.throw(Error, 'Options for date.serial must match {from:date,to:date (default: infinity),next{interval:"year"|"month"|"day"|"hour"|"minute"|"second",increment:integer},cycle:boolean (default: true),format:string (default: mm-dd-yyyy)}');
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
            
            assert.equal(date1, '01-01-2016');
            assert.equal(date2, '01-02-2016');
            assert.equal(date3,'01-03-2016');
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
            
            assert.equal(date1, '01-01-2016');
            assert.equal(date2, '01-02-2016');
            assert.equal(date3, '01-03-2016');
            assert.equal(date4, '01-04-2016');
            assert.equal(date5, '01-05-2016');
            
            expect(function () {
                
                dateType.getValue(model);
                
            }).to.throw(Error, 'Max increment. Add cycle: true to allow reloop');
            
        });
    });
    
    describe('#random', function () {
       
        it ('should assert parameters are correct', function () {
           
            var dateType = dgf.types.date.random({
                from: new Date(2016, 0, 1, 0, 0, 0, 0),
                to: new Date(2016, 0, 5, 0, 0, 0, 0)
            });
            
            assert.isNotNull(dateType);
            assert.property(dateType, '__GEN_TYPE_IND');
            assert.isFunction(dateType.getValue);
        });
        
        it ('should return a random date between the 1 JAN 2016 and 31 JAN 2016', function () {
           
            var model = dgf.newModel();
            var dateType = dgf.types.date.random({
                from: new Date(2016, 0, 1, 0, 0, 0, 0),
                to: new Date(2016, 0, 5, 0, 0, 0, 0)
            });
            
            var dates = [
                '01-01-2016',
                '01-02-2016',
                '01-03-2016',
                '01-04-2016',
                '01-05-2016',
                '01-06-2016',
                '01-07-2016',
                '01-08-2016',
                '01-09-2016',
                '01-10-2016',
                '01-11-2016',
                '01-12-2016',
                '01-13-2016',
                '01-14-2016',
                '01-15-2016',
                '01-16-2016',
                '01-17-2016',
                '01-18-2016',
                '01-19-2016',
                '01-20-2016',
                '01-21-2016',
                '01-22-2016',
                '01-23-2016',
                '01-24-2016',
                '01-25-2016',
                '01-26-2016',
                '01-27-2016',
                '01-28-2016',
                '01-29-2016',
                '01-30-2016',
                '01-31-2016'
            ];
            
            // test generation of 1000 dates
            for (var i = 1; i <= 100; i++) {
                
                var result = dateType.getValue(model);
                
                assert.include(dates, result);
            }
        });
        
        it ('should fotmat date in given format', function () {
            
            var model = dgf.newModel();
            var dateType = dgf.types.date.random({
                from: new Date(2016, 1, 1, 3, 4, 5, 6),
                to: new Date(2016, 1, 1, 3, 4, 5, 6),
                format: 'dd/mm/yyyy HH:MM:ss'
            });
            
            var result = dateType.getValue(model);
                
            assert.equal(result, '01/02/2016 03:04:05');
        });
    });
});