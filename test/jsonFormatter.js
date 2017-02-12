var dgf = require('../');
var assert = require('chai').assert;
var expect = require('chai').expect;
var check = require("check-type");
var path = require('path');
var fs = require('fs');
var moment = require('moment');

describe('json formatter', function() {
    
    it ('should create new json formatter', function() {
       
        var formatter = dgf.formatters.json();

        assert.equal(formatter.quotes, '"');
    });
    
    it ('should create new json formatter with quotes', function() {
       
        var formatter = dgf.formatters.json({
            quotes: '"'
        });

        assert.equal(formatter.quotes, '"');
    });
    
    it ('should format null into string', function() {
       
        var formatter = dgf.formatters.json();
        var objectToFormat = null;
        
        var result = formatter.formatEntity(objectToFormat);
        
        assert.equal(result, 'null');
    });
    
    it ('should format string into string', function() {
       
        var formatter = dgf.formatters.json();
        var objectToFormat = 'a string';
        
        var result = formatter.formatEntity(objectToFormat);
        
        assert.equal(result, '"a string"');
    });
    
    it ('should format number into number', function() {
       
        var formatter = dgf.formatters.json();
        var objectToFormat = 1;
        
        var result = formatter.formatEntity(objectToFormat);
        
        assert.equal(result, '1');
    });
    
    it ('should format array into string', function() {
       
        var formatter = dgf.formatters.json();
        var objectToFormat = ['value 1', 'value 2', 'value 3'];
        
        var result = formatter.formatEntity(objectToFormat);
        
        assert.equal(result, '["value 1","value 2","value 3"]');
    });
    
    it ('should format simple object into string', function() {
       
        var formatter = dgf.formatters.json();
        var objectToFormat = { field: 'value' };
        
        var result = formatter.formatEntity(objectToFormat);
        
        assert.equal(result, '{"field":"value"}');
    });
    
    it ('should format deep object into string', function() {
       
        var formatter = dgf.formatters.json();
        var objectToFormat = { field1: { field2: 'value' } };
        
        var result = formatter.formatEntity(objectToFormat);
        
        assert.equal(result, '{"field1":{"field2":"value"}}');
    });
});