var extend = require('extend');

var utils = require('../utils.js');

module.exports = function (modelToGenerate) {
    
    for (var entityName in modelToGenerate.generators) {

        var entityTemplate = modelToGenerate.entities[entityName];

        // iterate over all generators
        modelToGenerate.generators[entityName].forEach(function (generator, index) {

            var template = modelToGenerate.entities[generator.entity]

            var formatBegin = generator.formater.formatBegin(extend({}, template));
            modelToGenerate.outputs[generator.output].write(formatBegin);

            while (generator.behavior.canGenerate()) {
                // generate a new entity from template
                var result = utils.generateEntityFrom(template, modelToGenerate);
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
};