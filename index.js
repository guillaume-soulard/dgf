var check = require("check-type")

check.init();

module.exports = {
    newModel: function() {
        return {
            entities: {},
            outputs: {},
            generators: {},
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
                
            }
        };
    },
    
    types: {
        integer: {
            serial: function (options) {
                
            },
            random: function (options) {
                
            }
        },
        date: {
            serial: function (options) {
                
            },
            random: function (options) {
                
            }
        },
        string: {
            pattern: function (options) {
                
            }
        },
        list: function (list) {
            return {
                random: function() {
                    
                },
                sequance: function (options) {
                    
                }
            }
        }
    },
    outputs: {
        file: function (options) {
            return {
                write: function (data) {
                    // TODO : write into a file
                    console.log(data);
                }
            };
        },
        stdout: function () {
            return {
                write: function (data) {
                    console.log(data);
                }
            }
        }
    },
    
    formaters: {
        csv: function (options) {
            
        },
        xml: function (options) {
            
        }
    },
    behaviors: {
        times: function (amount) {
            
        },
        during: function (timeInMiliseconds) {
            
        },
        until: function (dateTo) {
            
        },
        pathSizeReach: function (options) {
            
        }
    }
};

var utils = {
    check: function (structure, objectToCheck) {
        
        
    }
}