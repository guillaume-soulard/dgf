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
    
    describe('#generateEntityFrom', function () {
       
        it ('should generate an entity from simple template', function () {
           
            var template = {
                number: 1,
                string: 'a string'
            };
            
            var generatedEntity = utils.generateEntityFrom(template).object;
            
            expect(generatedEntity).to.have.deep.property('number', 1);
            expect(generatedEntity).to.have.deep.property('string', 'a string');
        });
        
        it ('should generate an entity from template with serial number', function () {
           
            var template = {
                number: dgf.types.integer.serial({from: 5, to: 10, next: 1, cycle: true}),
                string: 'a string'
            };
            
            var generatedEntity = utils.generateEntityFrom(template).object;
            
            expect(generatedEntity).to.have.deep.property('number', 5);
            expect(generatedEntity).to.have.deep.property('string', 'a string');
        });
        
        
        it ('should generate three entity from template with serial number', function () {
           
            var template = {
                number: dgf.types.integer.serial({from: 5, to: 10, next: 1, cycle: true}),
                string: 'a string'
            };
            
            var result = utils.generateEntityFrom(template);
            var generatedEntity = result.object;
            template = result.template;
            expect(generatedEntity).to.have.deep.property('number', 5);
            expect(generatedEntity).to.have.deep.property('string', 'a string');
            
            result = utils.generateEntityFrom(template);
            generatedEntity = result.object;
            template = result.template;
            expect(generatedEntity).to.have.deep.property('number', 6);
            expect(generatedEntity).to.have.deep.property('string', 'a string');
            
            result = utils.generateEntityFrom(template);
            generatedEntity = result.object;
            template = result.template;           
            expect(generatedEntity).to.have.deep.property('number', 7);
            expect(generatedEntity).to.have.deep.property('string', 'a string');
        });
    });
});