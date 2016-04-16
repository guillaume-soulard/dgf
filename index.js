var check = require('check-type');
var path = require('path');
var fs = require('fs');
var utils = require('./utils.js');
var objectPath = require('object-path');

check.init();

module.exports = {
    newModel: function() {
        return {
            settings: {
                defaultDateFormat: 'mm-dd-yyyy'
            },
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
                throw new Error('Not implemented');        
            },
            random: function (options) {
                throw new Error('Not implemented');                
            }
        },
        date: {
            serial: function (options) {
                throw new Error('Not implemented');                
            },
            random: function (options) {
                throw new Error('Not implemented');                  
            }
        },
        string: {
            pattern: function (options) {
                throw new Error('Not implemented');                  
            }
        },
        list: function (list) {
            return {
                random: function() {
                    throw new Error('Not implemented');                      
                },
                sequance: function (options) {
                    throw new Error('Not implemented');                      
                }
            }
        }
    },
    outputs: {
        file: function (options) {
            
            if (!check(options).matches({
                path: 'string',
                encoding: 'string'
            })) {
                throw new Error('File options not matches {path:string,encoding:string}')
            }
            
            return {
                
                filePath: options.path,
                fileEncoding: options.encoding,
                write: function (data) {
                    if (!fs.existsSync(this.filePath)) {
                        // create full parent file path
                        fs.mkdirSync(path.dirname(this.filePath));
                    }
                        
                    fs.appendFileSync(this.filePath, data, this.fileEncoding);                    
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
    
    formatters: {
        csv: function (options) {
            if (!check(options).matches({
                separator: 'string',
                headers: 'boolean'
            })) {
                throw new Error('Csv options must match : {separator:string,headers:boolean}');   
            }
            
            return {
                csvSeparator: options.separator,
                writeHeaders: options.headers,
                
                formatBegin: function (entityTemplate) {
                    var header = '';
                    
                    if (this.writeHeaders) {
                        
                        var properties = utils.getPropertiesDeeply(entityTemplate);            
                        var first = true;
                        
                        for (var key in properties) {
                            
                            if (first) {
                                first = false;
                            } else {
                                header += this.csvSeparator;
                            }
                            
                            header += properties[key];
                        }
                    }
                    
                    return header;
                },
                
                formatEnd: function (entityTemplate) {
                    // Do nothing
                    return '';
                },
                
                formatEntity: function (generatedEntity) {
                    var formatedEntity = '';
                    
                    var isFirst = true;
                    var properties = utils.getPropertiesDeeply(generatedEntity);
                    
                    for (var key in properties) {
                        
                        if (isFirst) {
                            isFirst = false;
                        } else {
                            formatedEntity += this.csvSeparator;
                        }
                        
                        formatedEntity += objectPath.get(generatedEntity, properties[key]);
                    }
                    
                    return formatedEntity;
                }  
            };
        },
        xml: function (options) {
            throw new Error('Not implemented');
            
            return {
                formatBegin: function (entityTemplate) {
                    
                },
                
                formatEnd: function (entityTemplate) {

                },
                
                formatEntity: function (generatedEntity) {
                    
                }  
            }
        }
    },
    behaviors: {
        times: function (amount) {
            throw new Error('Not implemented');            
        },
        during: function (timeInMiliseconds) {
            throw new Error('Not implemented');            
        },
        until: function (dateTo) {
            throw new Error('Not implemented');            
        },
        pathSizeReach: function (options) {
            throw new Error('Not implemented');            
        }
    }
};