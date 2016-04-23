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
            }).to.throw(Error, 'Max increment. Add cycle: true to allow reloop');
        });
    });
    
     describe('#random', function () {
         
         it ('should return a number randomlly bettwen 1 and 10', function () {
            
             var randomInteger = dgf.types.integer.random({from: 1, to: 10});
             var model = dgf.newModel();
             
             for (var i = 0; i <= 10; i++) {
                 var number = randomInteger.getValue(model);
                assert.include([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], number);
             }
         });
         
         it ('should return the same sequence of number betwwen 1 and 10 for seed 1', function () {
            
             var randomInteger = dgf.types.integer.random({from: 1, to: 10});
             var model = dgf.newModel();
             model.seed = 1;
             
             assert.equal(6, randomInteger.getValue(model));
             assert.equal(10, randomInteger.getValue(model));
             assert.equal(5, randomInteger.getValue(model));
             assert.equal(9, randomInteger.getValue(model));
             assert.equal(4, randomInteger.getValue(model));
             assert.equal(4, randomInteger.getValue(model));
             assert.equal(2, randomInteger.getValue(model));
             assert.equal(2, randomInteger.getValue(model));
             assert.equal(10, randomInteger.getValue(model));
             assert.equal(3, randomInteger.getValue(model));
             assert.equal(9, randomInteger.getValue(model));
         });
         
         it ('should return a different number for seed 1234567890 and seed 1 for first call', function () {
            
             var randomInteger1 = dgf.types.integer.random({from: 1, to: 10});
             var model1 = dgf.newModel();
             model1.seed = 1;
             
             var randomInteger2 = dgf.types.integer.random({from: 1, to: 10});
             var model2 = dgf.newModel();
             model2.seed = 1234567890;
             
             assert.notEqual(randomInteger2.getValue(model2), randomInteger1.getValue(model1));
         });
     });
});