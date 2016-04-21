var dgf = require('../');
var assert = require('chai').assert;
var intercept = require('intercept-stdout');

describe('dgf', function () {
    describe('#newModel()', function () {        
        it('should return a new model with basic functions', function () {
            assert.isDefined(dgf);
            assert.isFunction(dgf.newModel);
        });
    });
    
    describe ('#generate', function () {
       
        it ('should generate 10 entities according entity template', function () {
           
            var stdout = [];
            var model = dgf.newModel();
            
            var entity = {
                ascending: dgf.types.integer.serial({from: 1, next: 1}),
                descending: dgf.types.integer.serial({from: 100, next: -1})
            };
            
            model.addEntity('entity', entity);
            
            model.addOutput('entityOutput', dgf.outputs.stdout());

            model.addGenerator({
                entity: 'entity',
                output: 'entityOutput',
                formater: dgf.formatters.csv({
                    separator: ';',
                    headers: true
                }),
                behavior: dgf.behaviors.times(10)
            });

            var unhook_intercept = intercept(function(txt) {
                stdout.push(txt);
            });
            
            dgf.generate(model);
            
            unhook_intercept();
            
            // headers
            assert.include(stdout, 'ascending;descending\n');
            
            // values
            assert.include(stdout, '1;100\n');
            assert.include(stdout, '2;99\n');
            assert.include(stdout, '3;98\n');
            assert.include(stdout, '4;97\n');
            assert.include(stdout, '5;96\n');
            assert.include(stdout, '6;95\n');
            assert.include(stdout, '7;94\n');
            assert.include(stdout, '8;93\n');
            assert.include(stdout, '9;92\n');
            assert.include(stdout, '10;91\n');
        });
    });
});