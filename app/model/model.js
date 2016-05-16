var check = require('check-type');
var random = require('random-js');

module.exports = function() {

    return {
        settings: {
            seed: null,
            defaultDateFormat: 'mm-dd-yyyy'
        },
        getEngine: function () {
            
            if (this.__engine == null) {

                if (typeof (this.settings) !== 'undefined' &&
                    typeof (this.settings.seed) !== 'undefined' &&
                    this.settings.seed != null) {

                    this.__engine = random.engines.mt19937().seed(this.settings.seed);
                    console.log('seed');
                } else {

                    this.__engine = random.engines.mt19937().autoSeed();  
                    console.log('auto seed');
                }
            }
            
            return this.__engine;
        },
        __engine: null,
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
};