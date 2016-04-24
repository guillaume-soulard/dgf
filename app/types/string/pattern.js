var check = require('check-type');
var extend = require('extend');
var random = require('random-js');

/**
*   The pattern format follow : 
*   
*   The article reference is #{AAAAAAAAA}
*
*   Where caractère between "#{}" are : 
*   
*       - a : any lower case letter between a and z
*       - A : any upper case letter between A and Z
*       - z : any upper or lower case letter betwwen a and Z
*       - n : any number between 0 and 9
**/
module.exports = function (options) {
    
    if (typeof (options) === 'undefined' ||
            options == null) {
        
        throw new Error ('String options must be {pattern: <pattern>}');
        
        return extend({}, AbstractType, {
            pattern: options.pattern,
            
            getValue: function (model) {
                
                var matches = /\#\{[A|a|z|n]*\}/.exec(this.pattern);
                
                for (var key in matches) {
                    
                    
                }
            }
        });
    }
};