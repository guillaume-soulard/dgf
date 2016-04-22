var check = require('check-type');

var utils = require('./utils.js');
var formatters = require('./formatters/formatters.js');
var behaviors = require('./behaviors/behaviors.js');
var types = require('./types/types.js');
var outputs = require('./outputs/outputs.js');
var model = require('./model/model.js');
var generation = require('./generation/generation.js');

check.init();

module.exports = {
    
    generate: generation,
    newModel: model,
    
    types: types,
    outputs: outputs,    
    formatters: formatters,
    behaviors: behaviors
};