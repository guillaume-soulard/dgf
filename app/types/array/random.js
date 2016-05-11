var check = require('check-type');
var extend = require('extend');
var random = require('random-js');

var AbstractType = require('../abstract.js');
var utils = require('../../utils.js');

module.exports = function (options) {
    if (!check(options).has('from')
        || !check(options).has('to')
        || !check(options).has('object')) {
        
        throw new Error('Options for array.random must match {from:date,to:date,object:object}');
    }
    
    return extend({}, AbstractType, {        

        min: options.from,
        max: options.to,
        template: options.object,
        engine: null,
        distribution: null,
        
        getValue: function (model) {
                        
            if (this.engine == null
                && this.distribution == null) {
                this.engine = utils.newEngineByModel(model);
                this.distribution = random.integer(this.min, this.max);
            }
            
            if (this.format == null) {
                this.format = model.settings.defaultDateFormat;
            }
            
            var array = [];
            var maxGenerated = this.distribution(this.engine);
            
            for (var i = 0; i < maxGenerated; i++) {
                                
                array.push(utils.generateEntityFrom(this.template, model).object);
            }
            
            return array;
        }
    });   
};