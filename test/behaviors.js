var dgf = require('../');
var assert = require('chai').assert;
var expect = require('chai').expect;
var check = require("check-type");

describe ('behaviors', function () {
   
    describe ('#times', function () {
       it ('should return false after 10 calls', function () {
          
           var timesBehavior = dgf.behaviors.times(10);
           
           assert.isTrue(timesBehavior.canGenerate(), 'Call 1');
           assert.isTrue(timesBehavior.canGenerate(), 'Call 2');
           assert.isTrue(timesBehavior.canGenerate(), 'Call 3');
           assert.isTrue(timesBehavior.canGenerate(), 'Call 4');
           assert.isTrue(timesBehavior.canGenerate(), 'Call 5');
           assert.isTrue(timesBehavior.canGenerate(), 'Call 6');
           assert.isTrue(timesBehavior.canGenerate(), 'Call 7');
           assert.isTrue(timesBehavior.canGenerate(), 'Call 8');
           assert.isTrue(timesBehavior.canGenerate(), 'Call 9');
           assert.isTrue(timesBehavior.canGenerate(), 'Call 10');
           
           assert.isFalse(timesBehavior.canGenerate());
       });
        
        it ('should throw error because amount is negative', function () {
          
           expect(function () {
               dgf.behaviors.times(-3);
           }).to.throw(Error, 'Amount must be a positive number or 0');
       });
    });
});