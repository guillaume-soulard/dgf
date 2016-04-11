var dgf = require('../');
var assert = require('chai').assert;

describe('model', function () {
    describe('#methods', function () {
               
        
        it('should return a new model with basic functions', function () {
            
            var model = dgf.newModel(); 
            
            assert.isDefined(model);
            assert.isObject(model.entities);
            assert.isObject(model.generators);
            assert.isObject(model.outputs);
            assert.isFunction(model.addEntity);
        });
    });
    
    describe('#newEntity', function () {
        
        it ('should add new entity in model', function () {
            
            var model = dgf.newModel(); 
            
            model.addEntity('entityName',  {
               field: 'constant'
            });
            
            assert.isObject(model.entities);
            assert.property(model.entities, 'entityName');
            assert.isObject(model.generators);
            assert.isObject(model.outputs);
        });
    });
});