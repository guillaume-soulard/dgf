var extend = require('extend');
var random = require('random-js');

module.exports = {
    getPropertiesDeeply: function (object) {
        var properties = [];
        
        for (var key in object) {
            var subProperties = [];
            
            // exclude gentypes
            if (typeof(object[key]) === 'object' && typeof(object[key].__GEN_TYPE_IND) === 'undefined') {
                subProperties = this.getPropertiesDeeply(object[key]);
            }
        
            if (subProperties.length > 0) {
                for (var subProperty in subProperties) {
                    properties.push(key + '.' +subProperties[subProperty]);
                }
            } else {
                properties.push(key);                
            }
            
        }
        
        return properties;
    },
    generateEntityFrom: function (entityTemplate, model) {
        return generateObjectFrom(entityTemplate, model);
    },
    newEngineByModel: function (model) {
        
        var engine = null;
        
        if (typeof(model) !== 'undefined' && 
            typeof (model.seed) !== 'undefined' &&
            model.seed != null) {
            
            engine = random.engines.mt19937().seed(model.seed);
        } else {
            
            engine = random.engines.mt19937().autoSeed();            
        }
        
        return engine;
    }
}

function generateObjectFrom (templateToUse, model) {
    var generatedObject = extend({}, templateToUse);
    
    for (var key in templateToUse) {
        if (typeof(templateToUse[key]) === 'object' && 
            typeof(templateToUse[key].__GEN_TYPE_IND) === 'undefined') {
            
            var result = generatedObject(templateToUse[key]);
            generatedObject[key] = result.object;
            templateToUse = result.template;
        } else if (typeof(templateToUse[key]) === 'object' && 
                   typeof(templateToUse[key].__GEN_TYPE_IND) !== 'undefined') {
            
            generatedObject[key] = templateToUse[key].getValue(model);
        } else {
            // do nothing
        }
    }
    
    return {
        object: generatedObject, 
        template: templateToUse
    };
}