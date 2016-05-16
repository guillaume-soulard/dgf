var extend = require('extend');
var dateFormat = require('dateformat');

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
    formatDate: function (date, format) {
        
        return dateFormat(date, format);
    }
}

function generateObjectFrom (templateToUse, model) {
    var generatedObject = null;
            
    if (typeof(templateToUse) === 'object') {
                
        generatedObject = extend({}, templateToUse);
        
        if (isGenType(templateToUse)) {
            
            generatedObject = templateToUse.getValue(model);
        } else {
        
            for (var key in templateToUse) {
                if (isStandardObject(templateToUse[key])) {

                    var result = generateObjectFrom(templateToUse[key]);
                    generatedObject[key] = result.object;
                    templateToUse = result.template;
                } else if (isGenType(templateToUse[key])) {

                    generatedObject[key] = templateToUse[key].getValue(model);
                } else {
                    // do nothing
                }
            }
        }
    } else {
        
        generatedObject = templateToUse;
    }
    
    return {
        object: generatedObject, 
        template: templateToUse
    };
}

function isGenType(object) {
    
    return object != null &&
            typeof(object) === 'object' && 
            typeof(object.__GEN_TYPE_IND) !== 'undefined';
}

function isStandardObject(object) {
    
    return object != null &&
            typeof(object) === 'object' && 
            typeof(object.__GEN_TYPE_IND) === 'undefined';
}