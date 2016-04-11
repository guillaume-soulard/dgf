module.exports = {
    newModel: function() {
        return {
            entities: {},
            outputs: {},
            generators: {},
            addEntity: function (entityName, entityDef) {
                if (typeof(this.entities[entityName]) === 'undefined') {
                    this.entities[entityName] = entityDef;
                } else {
                    throw 'Entity ' + entityName + ' already exists';
                }
            },
            newGenerator: function (generatorDefinition) {
        
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
            
        },
        stdout: function () {
            
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