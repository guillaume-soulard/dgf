var dgf = require('../');
var assert = require('chai').assert;
var expect = require('chai').expect;
var check = require("check-type");
var path = require('path');
var fs = require('fs');

describe ('formatters', function () {
   
    describe ('csv', function () {
        
        
        it ('should create new csv formatter', function () {
            var formatter = dgf.formatters.csv({
                separator: ';',
                headers: false
            });
            
            assert.isTrue(check(formatter).has('formatEntity'));
            assert.equal(formatter.csvSeparator, ';');
            assert.equal(formatter.writeHeaders, false);
        });
        
        it ('should throw exception when bad options are passed', function () {
            var options = {
                bad: ';',
                headers: false
            };
            
            expect(function() {
                dgf.formatters.csv();
            }).to.throw(Error, /Csv options must match : {separator:string,headers:boolean}/);            
        });
        
        it ('should format given entity as csv', function () {
            var formatter = dgf.formatters.csv({
                separator: ';',
                headers: false
            });
            
            var result = formatter.formatEntity({
                number: 1,
                string: 'a string',
                date: new Date(2016, 0, 1, 0, 0, 0)
            });
            
            assert.equal(result, '1;a string;Fri Jan 01 2016 00:00:00 GMT+0100 (CET)');
        });
    });
});