var dgf = require('../');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var check = require('check-type');

describe('dgf.type.array', function () {
   
    describe('#random', function () {
        
        it ('should create array type generator', function () {
           
            var model = dgf.newModel();
            var arrayType = dgf.types.array.random({
                from: 0, 
                to: 10,
                object: 'A string'
            });
            
            assert.isNotNull(arrayType);
            assert.property(arrayType, '__GEN_TYPE_IND');
            assert.isFunction(arrayType.getValue);
        });
        
        it ('should generate an array of fix string', function () {
            
            var model = dgf.newModel();
            var arrayType = dgf.types.array.random({
                from: 5, 
                to: 10,
                object: 'A string'
            });
            
            var result = arrayType.getValue(model);
                        
            assert.isArray(result);
            assert.isAtMost(result.length, 10);
            assert.isAtLeast(result.length, 5);
            assert.include(result, 'A string');
            
        });
        
        it ('should generate an array of dynamic number', function () {
            
            var model = dgf.newModel();
            var arrayType = dgf.types.array.random({
                from: 5, 
                to: 10,
                object: dgf.types.integer.serial({
                    from: 1,
                    to: 10,
                    next: 1
                })
            });
            
            var result = arrayType.getValue(model);
                        
            assert.isArray(result);
            assert.isAtMost(result.length, 10);
            assert.isAtLeast(result.length, 5);
                        
            for (var expected = 1; expected <= result.length - 1; expected++) {
                
                assert.equal(result[expected - 1], expected);
            }
        });
        
        it ('should generate an array complex fix object', function () {
            
            var fixObject = {
                complexObject: {
                    subComplexObject: {
                        number: 1
                    },
                    string: 'string'
                }   
            };
            var model = dgf.newModel();
            var arrayType = dgf.types.array.random({
                from: 5, 
                to: 5,
                object: fixObject
            });
            
            var result = arrayType.getValue(model);
            
            assert.isArray(result);
            assert.equal(result.length, 5);
                                    
            assert.deepEqual(result[0], fixObject);
            assert.deepEqual(result[1], fixObject);
            assert.deepEqual(result[2], fixObject);
            assert.deepEqual(result[3], fixObject);
            assert.deepEqual(result[4], fixObject);
        });
        
        it ('should generate an array of complex dynamic object', function () {
            
             var dynamicObject = {
                complexObject: {
                    subComplexObject: {
                        number: dgf.types.integer.serial({
                            from: 1,
                            to: 10,
                            next: 1
                        })
                    },
                    string: 'string'
                }   
            };
            var model = dgf.newModel();
            var arrayType = dgf.types.array.random({
                from: 5, 
                to: 5,
                object: dynamicObject
            });
            
            var result = arrayType.getValue(model);
            
            assert.isArray(result);
            assert.equal(result.length, 5);
            
            for (var i = 0; i < result.length; i++) {
                assert.deepEqual(result[i], {
                    complexObject: {
                        subComplexObject: {
                            number: i + 1
                        },
                        string: 'string'
                    }
                });
            }
        });
        
        it ('should generate an array of an dynamic array of dynamic object', function () {
            
            var dynamicObject = {
                complexObject: {
                    subComplexObject: {
                        number: dgf.types.integer.serial({
                            from: 1,
                            to: 100,
                            next: 1
                        })
                    },
                    string: 'string'
                }   
            };
            var model = dgf.newModel();
            var arrayType = dgf.types.array.random({
                from: 5, 
                to: 5,
                object: dgf.types.array.random({
                    from: 1,
                    to: 3,
                    object: dynamicObject
                })
            });
            
            var result = arrayType.getValue(model);
            
            assert.isArray(result);
            assert.equal(result.length, 5);
            
            var expected = 1;
            
            for (var i = 0; i < result.length; i++) {
                
                assert.isArray(result[i]);
                
                for (var j = 0; j < result[i].length; j++) {
                    
                    console.log(result[i][j].complexObject.subComplexObject.number);
                    console.log(j);
                    assert.deepEqual(result[i][j], {
                        complexObject: {
                            subComplexObject: {
                                number: expected
                            },
                            string: 'string'
                        }
                    });
                    
                    expected++;
                }
            }
        });
        
        it ('should generate the same array on seed 1', function () {
            
            throw new Error('Not implemented');
        });
    });
});