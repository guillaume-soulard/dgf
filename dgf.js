var dgf = {
    newModel: function() {
        
    },
    newEntity: function (entityName, entityDef) {
        
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
    newGenerator: function (generatorDefinition) {
        
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