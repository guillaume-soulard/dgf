var check = require('check-type');
var extend = require('extend');
var random = require('random-js');

var utils = require('../../utils.js');
var AbstractType = require('../abstract.js');

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
    
    if ((typeof (options) === 'undefined' ||
            options == null) && !check(options).has('pattern')) {
        
        throw new Error ('String options must be {pattern: <pattern>}');
    }
    
    return extend({}, AbstractType, {
        pattern: options.pattern,
        engine: null,
        distributions: null,

        getValue: function (model) {

            if (this.engine == null) {
                this.engine = utils.newEngineByModel(model);
            }

            if (this.distributions == null) {
                this.distributions = {
                    letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                    numberDist: random.integer(0, 9),
                    upperLowerDist: random.bool()
                };
            }

            var string = this.pattern;
            
            pattern = /\#\{[A|a|z|n]*\}/;
            
            var match;
            while ((match = pattern.exec(string))) {

                var generatedString = generateStringFrom(match[0], this.engine, this.distributions);                    
                string = string.replace(match[0], generatedString);
            }            
            
            return string;
        }
    });
};

function generateStringFrom (pattern, engine, distributions) {
    
    var generatedString = '';
    
    var i = pattern.length;
        
    while (i--) {
        generatedString = getCharacterFrom(pattern[i], engine, distributions) + generatedString;
    }
    
    return generatedString;
}

function getCharacterFrom (characterPattern, engine, distributions) {
    
    // ignore '#{}'
    if (characterPattern != '#' && 
        characterPattern != '{' &&
        characterPattern != '}') {
    
        
        if (characterPattern == 'n') {

            // number
            return distributions.numberDist(engine);
        } else if (characterPattern == 'a') {

            // lower case letter
            return random.pick(engine, distributions.letters);
        } else if (characterPattern == 'A') {

            // upper case letter
            return random.pick(engine, distributions.letters).toUpperCase();
        } else if (characterPattern == 'z') {

            // upper or lower case letters
            var isUpper = distributions.upperLowerDist(engine);
            var letter = random.pick(engine, distributions.letters);
            
            if (isUpper) {
                letter = letter.toUpperCase();
            }
            
            return letter;
        } else {

            throw new Error('The character \'' + characterPattern + '\' is not a valid character');
        }
    }
    
    return '';
}