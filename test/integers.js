var dgf = require('../');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe('types.numbers', function () {
   
    describe('#serial', function () {
       
        it ('should throw error because options are incorrect', function () {
            
            expect(function() {
                dgf.types.integer.serial();
            }).to.throw(Error, 'Options for integer.serial must match {from:integer,to:integer (default: infinity),next:integer (default: 1),cycle:boolean (default: true)}');
        });
        
        it ('should give all integers betwwen 0 and 10 in order', function () {
           
            var numberType = dgf.types.integer.serial({
                from: 0,
                to: 10,
                next: 1
            });
            
            assert.equal(numberType.getValue(), 0);
            assert.equal(numberType.getValue(), 1);
            assert.equal(numberType.getValue(), 2);
            assert.equal(numberType.getValue(), 3);
            assert.equal(numberType.getValue(), 4);
            assert.equal(numberType.getValue(), 5);
            assert.equal(numberType.getValue(), 6);
            assert.equal(numberType.getValue(), 7);
            assert.equal(numberType.getValue(), 8);
            assert.equal(numberType.getValue(), 9);
            assert.equal(numberType.getValue(), 10);
        });
        
        it ('should give all integers betwwen 0 and 10 in order twice', function () {
           
            var numberType = dgf.types.integer.serial({
                from: 0,
                to: 10,
                next: 1
            });
            
            assert.equal(numberType.getValue(), 0);
            assert.equal(numberType.getValue(), 1);
            assert.equal(numberType.getValue(), 2);
            assert.equal(numberType.getValue(), 3);
            assert.equal(numberType.getValue(), 4);
            assert.equal(numberType.getValue(), 5);
            assert.equal(numberType.getValue(), 6);
            assert.equal(numberType.getValue(), 7);
            assert.equal(numberType.getValue(), 8);
            assert.equal(numberType.getValue(), 9);
            assert.equal(numberType.getValue(), 10);
            
            
            assert.equal(numberType.getValue(), 0);
            assert.equal(numberType.getValue(), 1);
            assert.equal(numberType.getValue(), 2);
            assert.equal(numberType.getValue(), 3);
            assert.equal(numberType.getValue(), 4);
            assert.equal(numberType.getValue(), 5);
            assert.equal(numberType.getValue(), 6);
            assert.equal(numberType.getValue(), 7);
            assert.equal(numberType.getValue(), 8);
            assert.equal(numberType.getValue(), 9);
            assert.equal(numberType.getValue(), 10);
        });
        
        it ('should give all integers betwwen 0 and 10 in and trow error if sequance has reach it\'s max', function () {
           
            var numberType = dgf.types.integer.serial({
                from: 0,
                to: 10,
                next: 1,
                cycle: false
            });
            
            assert.equal(numberType.getValue(), 0);
            assert.equal(numberType.getValue(), 1);
            assert.equal(numberType.getValue(), 2);
            assert.equal(numberType.getValue(), 3);
            assert.equal(numberType.getValue(), 4);
            assert.equal(numberType.getValue(), 5);
            assert.equal(numberType.getValue(), 6);
            assert.equal(numberType.getValue(), 7);
            assert.equal(numberType.getValue(), 8);
            assert.equal(numberType.getValue(), 9);
            assert.equal(numberType.getValue(), 10);
            
            
            expect(function() {
                numberType.getValue();
            }).to.throw(Error, 'Max increment. Add cycle: false to allow reloop');
        });
    });
});