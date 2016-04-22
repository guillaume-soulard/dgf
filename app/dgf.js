var check = require('check-type');
var path = require('path');
var objectPath = require('object-path');
var extend = require('extend');

var utils = require('./utils.js');
var formatters = require('./formatters/formatters.js');
var behaviors = require('./behaviors/behaviors.js');
var types = require('./types/types.js');
var outputs = require('./outputs/outputs.js');

check.init();

module.exports = {
    
    generate: function (modelToGenerate) {
        
        for (var entityName in modelToGenerate.generators) {
            
            var entityTemplate = modelToGenerate.entities[entityName];
            
            // iterate over all generators
            modelToGenerate.generators[entityName].forEach(function (generator, index) {
                
                var template = modelToGenerate.entities[generator.entity]
                
                var formatBegin = generator.formater.formatBegin(extend({}, template));
                modelToGenerate.outputs[generator.output].write(formatBegin);
                
                while (generator.behavior.canGenerate()) {
                    // generate a new entity from template
                    var result = utils.generateEntityFrom(template);
                    template = result.template;
                    var generatedEntity = result.object;                    
                    
                    // format the generated entity
                    // TODO handle start and end format
                    var formatedEntity = generator.formater.formatEntity(generatedEntity);
                                                            
                    // send generated entity to the output
                    modelToGenerate.outputs[generator.output].write(formatedEntity);
                }         
                
                var formatEnd = generator.formater.formatEnd(extend({}, template));
                modelToGenerate.outputs[generator.output].write(formatEnd);
            });
        }
    },
    
    newModel: function() {
        return {
            settings: {
                defaultDateFormat: 'mm-dd-yyyy'
            },
            entities: {},
            outputs: {},
            generators: [],
            addEntity: function (entityName, entityDef) {
                                
                if (!check(entityName).is('string')) {
                    throw new Error('entityName must be a string');
                }
                
                if (typeof(this.entities[entityName]) === 'undefined') {
                    this.entities[entityName] = entityDef;
                } else {
                    throw new Error('Entity ' + entityName + ' already exists in model');
                }
            },
            addOutput: function (outputName, outpoutDefinition) {
                
                if (!check(outputName).is('string')) {
                    throw new Error('outputName must be a string');
                }
                
                if (typeof(this.outputs[outputName]) === 'undefined') {
                    this.outputs[outputName] = outpoutDefinition;
                } else {
                    throw new Error('Output ' + outputName + ' already exists in model');
                }                
            },
            addGenerator: function (generatorDefinition) {
                
                // TODO check dgf special objects such as formatters and behaviors
                if (!check(generatorDefinition).matches({
                    entity: 'string',
                    output: 'string',
                    formater: 'object',
                    behavior: 'object'
                })) {
                    throw new Error ('Generator definition must match {entity: string,output: string, formater: dgf.formatter,behavior: dgf.behavior');
                }
                
                if (typeof (this.generators[generatorDefinition.entity]) === 'undefined') {
                    this.generators[generatorDefinition.entity] = [];
                }
                
                this.generators[generatorDefinition.entity].push(generatorDefinition);
            }
        };
    },
    
    types: types,
    outputs: outputs,    
    formatters: formatters,
    behaviors: behaviors
};