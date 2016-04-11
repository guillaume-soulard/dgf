var dgf = require('../');
var assert = require('chai').assert;

describe('dgf', function () {
    describe('#newModel()', function () {        
        it('should return a new model with basic functions', function () {
            assert.isDefined(dgf);
            assert.isFunction(dgf.newModel);
        });
    });
});