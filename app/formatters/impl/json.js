var check = require('check-type');
var objectPath = require('object-path');

var utils = require('../../utils.js');

module.exports = function (options) {
    
    return {
        quotes: typeof(options) !== 'undefined' ? options.quotes : '"',

        formatBegin: function (entityTemplate) {
            // Do nothing
            return '';
        },

        formatEnd: function (entityTemplate) {
            // Do nothing
            return '';
        },

        formatEntity: function (generatedEntity) {
            
            return JSON.stringify(generatedEntity);
        }  
    };
};