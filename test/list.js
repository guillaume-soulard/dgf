var dgf = require('../');
var assert = require('chai').assert;
var expect = require('chai').expect;

describe ('dgf.list', function () {
   
    it ('should throw an error because the parameter is not an array', function () {
       
        expect(function () {
            dgf.types.list('a string')
        }).to.throw(Error, /The argument must be an array/);
    });
    
    it ('should not throw an error because the parameter is an array', function () {
        
        var result = dgf.types.list(['item 1', 'item 2', 'item 3']);
        
        assert.isNotNull(result);
    });
    
    describe('#serial', function() {
       
        it ('should return all elements of given in order', function () {
           
            var model = dgf.newModel();
            var list = dgf.types.list(['item 1', 'item 2', 'item 3']).serial();
            
            assert.equal(list.getValue(model), 'item 1');
            assert.equal(list.getValue(model), 'item 2');
            assert.equal(list.getValue(model), 'item 3');
        });
        
        it ('should return all elements of list given in order and throw error when end of list is reached', function () {
           
            var model = dgf.newModel();
            var list = dgf.types.list(['item 1', 'item 2', 'item 3']).serial({cycle: false});
            
            assert.equal(list.getValue(model), 'item 1');
            assert.equal(list.getValue(model), 'item 2');
            assert.equal(list.getValue(model), 'item 3');
            
            expect(function () {
                 list.getValue(null);
            }).to.throw(Error, 'Max increment. Add cycle: true to allow reloop');
        });
        
        it ('should return all elements of list given in order twice', function () {
           
            var model = dgf.newModel();
            var list = dgf.types.list(['item 1', 'item 2', 'item 3']).serial({cycle: true});
            
            assert.equal(list.getValue(model), 'item 1');
            assert.equal(list.getValue(model), 'item 2');
            assert.equal(list.getValue(model), 'item 3');
            
            assert.equal(list.getValue(model), 'item 1');
            assert.equal(list.getValue(model), 'item 2');
            assert.equal(list.getValue(model), 'item 3');
        });
    });
    
    describe ('#random', function () {
       
        it ('should return a random item in given list', function () {
            
            var model = dgf.newModel();
            var list = dgf.types.list(['item 1', 'item 2', 'item 3']).random();
            
            for (var i = 0; i <= 1000; i++) {
                assert.include(['item 1', 'item 2', 'item 3'], list.getValue(model));
            }
        });
        
        it ('should return a predefinied order for seed 1', function () {
            
            var model = dgf.newModel();
            model.seed = 1;
            var list = dgf.types.list(['item 1', 'item 2', 'item 3']).random();
            
            assert.equal(list.getValue(model), 'item 2');
            assert.equal(list.getValue(model), 'item 3');
            assert.equal(list.getValue(model), 'item 1');
            assert.equal(list.getValue(model), 'item 3');
            assert.equal(list.getValue(model), 'item 2');
            assert.equal(list.getValue(model), 'item 2');
            assert.equal(list.getValue(model), 'item 3');
            assert.equal(list.getValue(model), 'item 3');
            assert.equal(list.getValue(model), 'item 3');
            assert.equal(list.getValue(model), 'item 1');
        });
        
        it ('should return a predefinied order for seed 1234567890', function () {
            
            var model = dgf.newModel();
            model.seed = 1234567890;
            var list = dgf.types.list(['item 1', 'item 2', 'item 3']).random();
            
            for (var i = 0; i <= 10; i++) {
                 // console.log(list.getValue(model));
            }
            
            assert.equal(list.getValue(model), 'item 2');
            assert.equal(list.getValue(model), 'item 3');
            assert.equal(list.getValue(model), 'item 1');
            assert.equal(list.getValue(model), 'item 1');
            assert.equal(list.getValue(model), 'item 2');
            assert.equal(list.getValue(model), 'item 3');
            assert.equal(list.getValue(model), 'item 1');
            assert.equal(list.getValue(model), 'item 2');
            assert.equal(list.getValue(model), 'item 3');
            assert.equal(list.getValue(model), 'item 3');
        });
    });
});