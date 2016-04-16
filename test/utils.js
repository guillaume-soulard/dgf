var dgf = require('../');
var assert = require('chai').assert;
var expect = require('chai').expect;
var check = require("check-type");
var utils = require('../utils.js');

describe('utils', function () {
   
    describe('#getPropertiesDeeply', function () {
       
        it ('should get the list of object properties', function () {
           
            var object = {
                number: 1,
                string: 'a string',
                date: new Date()
            };
            
            var properties = utils.getPropertiesDeeply(object);
            
            assert.lengthOf(properties, 3);
            assert.include(properties, 'number', 'string', 'date');
        });
        
        it ('should get the list of properties from complex object', function () {
           
            var object = {
                number: 1,
                string: 'a string',
                date: new Date(),
                complexProperty: {
                    number: 1,
                    string: 'other string'
                }
            };
            
            var properties = utils.getPropertiesDeeply(object);
                        
            assert.lengthOf(properties, 5);
            assert.include(properties, 'number', 'string', 'date', 'complexProperty.number', 'complexProperty.string');
        });
    });
});