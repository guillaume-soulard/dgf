var dgf = require('../');
var assert = require('chai').assert;
var expect = require('chai').expect;
var check = require("check-type");
var path = require('path');
var fs = require('fs');
var moment = require('moment');
   
describe ('csv formatter', function () {

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

    it ('should format given simple entity as csv', function () {
        var formatter = dgf.formatters.csv({
            separator: ';',
            headers: false
        });

        var result = formatter.formatEntity({
            number: 1,
            string: 'a string',
            date: '01/01/2016'
        });

        assert.equal(result, '1;a string;01/01/2016');
    });

    it ('should get headers form entity', function () {
        var formatter = dgf.formatters.csv({
            separator: ';',
            headers: true
        });

        var result = formatter.formatBegin({
            number: 1,
            string: 'a string',
            date: '01/01/2016'
        });

        assert.equal(result, 'number;string;date');
    });

    it ('should not get headers form entity', function () {
        var formatter = dgf.formatters.csv({
            separator: ';',
            headers: false
        });

        var result = formatter.formatBegin({
            number: 1,
            string: 'a string',
            date: '01/01/2016'
        });

        assert.equal(result, '');
    });

    it ('should get headers form complex entity', function () {
        var formatter = dgf.formatters.csv({
            separator: ';',
            headers: true
        });

        var result = formatter.formatBegin({
            number: 1,
            complex: {
                string: 'an another string',
                number: 10
            },
            string: 'a string',
            date: '01/01/2016'
        });

        assert.equal(result, 'number;complex.string;complex.number;string;date');
    });

    it ('should format given complex entity as csv', function () {
        var formatter = dgf.formatters.csv({
            separator: ';',
            headers: false
        });

        var result = formatter.formatEntity({
            number: 1,
            complex: {
                string: 'an another string',
                number: 10
            },
            string: 'a string',
            date: '01/01/2016'
        });

        assert.equal(result, '1;an another string;10;a string;01/01/2016');
    });

    it ('should format given entity as csv without gen types', function () {
        var formatter = dgf.formatters.csv({
            separator: ';',
            headers: true
        });

        var result = formatter.formatBegin({
            number: dgf.types.integer.serial({from: 1}),
            string: 'a string',
            date: '01/01/2016'
        });

        assert.equal(result, 'number;string;date');
    });
});