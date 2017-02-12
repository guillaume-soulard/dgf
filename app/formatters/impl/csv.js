var check = require('check-type');
var objectPath = require('object-path');

var utils = require('../../utils.js');

module.exports = function (options) {
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
};