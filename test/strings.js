var dgf = require('../');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe ('dgf.types.string', function () {
   
    describe('#pattern', function () {
       
        it ('should return the given string without patterns', function () {
           
            var pattern = 'A string without pattern';
            var type = dgf.types.string.pattern({pattern: pattern});
            var model = dgf.newModel();
            
            var result = type.getValue(model);
            
            assert.equal(result, pattern);
        });
        
        it ('should return the given pattern with lower letters', function () {
            
            var pattern = 'A string with pattern : #{aaaa}';
            var type = dgf.types.string.pattern({pattern: pattern});
            var model = dgf.newModel();
            
            var result = type.getValue(model);
                        
            assert.match(result, /A string with pattern : [a-z]{4}/);
        });
        
        it ('should return the given pattern with upper case letters', function () {
            
            var pattern = 'A string with pattern : #{AAAA}';
            var type = dgf.types.string.pattern({pattern: pattern});
            var model = dgf.newModel();
            
            var result = type.getValue(model);
            
            assert.match(result, /A string with pattern : [A-Z]{4}/);
        });
        
        
        it ('should return the given pattern with upper or lower case letters', function () {
            
            var pattern = 'A string with pattern : #{zzzz}';
            var type = dgf.types.string.pattern({pattern: pattern});
            var model = dgf.newModel();
            
            var result = type.getValue(model);
            
            assert.match(result, /A string with pattern : [a-zA-Z]{4}/);
        });
        
        it ('should return the given pattern with numbers', function () {
            
            var pattern = 'A string with pattern : #{nnnnnn}';
            var type = dgf.types.string.pattern({pattern: pattern});
            var model = dgf.newModel();
            
            var result = type.getValue(model);
            
            assert.match(result, /A string with pattern : [0-9]{6}/);
        });
        
        it ('should return the given pattern with numbers and letters', function () {
            
            var pattern = 'A string with pattern : #{aaaannnn}';
            var type = dgf.types.string.pattern({pattern: pattern});
            var model = dgf.newModel();
            
            var result = type.getValue(model);
            
            assert.match(result, /A string with pattern : [a-z]{4}[0-9]{4}/);
        });
        
        it ('should return the given pattern with numbers and letters in two different expressions', function () {
            
            var pattern = 'A string with pattern : #{nnnnnn} and pattern #{aaaaa}';
            var type = dgf.types.string.pattern({pattern: pattern});
            var model = dgf.newModel();
            
            var result = type.getValue(model);
            
            assert.match(result, /A string with pattern : [0-9]{6} and pattern [a-z]{4}/);
        });
    });
});