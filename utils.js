var extend = require('extend');

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
    generateEntityFrom: function (entityTemplate) {
        return generateObjectFrom(entityTemplate);
    }
}

function generateObjectFrom (templateToUse) {
    var generatedObject = extend({}, templateToUse);
    
    for (var key in templateToUse) {
        if (typeof(templateToUse[key]) === 'object' && 
            typeof(templateToUse[key].__GEN_TYPE_IND) === 'undefined') {
            
            var result = generatedObject(templateToUse[key]);
            generatedObject[key] = result.object;
            templateToUse = result.template;
        } else if (typeof(templateToUse[key]) === 'object' && 
                   typeof(templateToUse[key].__GEN_TYPE_IND) !== 'undefined') {
            
            generatedObject[key] = templateToUse[key].getValue();
        } else {
            // do nothing
        }
    }
    
    return {
        object: generatedObject, 
        template: templateToUse
    };
}