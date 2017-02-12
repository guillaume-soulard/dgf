dgf = require('./');

var model = dgf.newModel();

model.addEntity('seeds', {
    seed: dgf.types.integer.serial({
        from: 1,
        next: 1
	}),
    version: '1.1',
    mark: dgf.types.integer.random({
        from: 0,
        to: 100
    }),
    pois: dgf.types.array.random({
        from: 100, 
        to: 1000,
        object: {
            poiFrom: dgf.types.integer.random({
                from: -7,
                to: 167
            }),
            poiTo: dgf.types.integer.random({
                from: -7,
                to: 167
            }),
            distance: dgf.types.integer.random({
                from: 0,
                to: 2000
            }),
            expression: dgf.types.list(['0<50', '51<100', '101<200', '201<500', '501<1000', '1001<2000', '2001<n']).random(),
            fromLocationX: dgf.types.integer.random({
                from: -2000,
                to: 2000
            }),
            fromLocationY: dgf.types.integer.random({
                from: -2000,
                to: 2000
            }),
            toLocationX: dgf.types.integer.random({
                from: -2000,
                to: 2000
            }),
            toLocationY: dgf.types.integer.random({
                from: -2000,
                to: 2000
            })
        }
    })
});

model.addOutput('seedsOutput', dgf.outputs.stdout());

model.addGenerator({
    entity: 'seeds',
    output: 'seedsOutput',
    formater: {
        formatBegin: function (entityTemplate) {

            var query = '';
            
            query += 'USE seedanalyzer;\n';
            
            query += 'TRUNCATE TABLE counters;\n';
            query += 'TRUNCATE TABLE poisdistancesearch;\n';
            query += 'TRUNCATE TABLE seeds;\n';
           
            return query;
        },
        formatEnd: function (entityTemplate) {

            return '';
        },
        formatEntity: function (generatedEntity) {
            var query = '';
            
            query += 'INSERT INTO seeds (seed, version, mark) VALUES (\'' + generatedEntity.seed + '\',\'' + generatedEntity.version + '\',' + generatedEntity.mark + ');\n';
            
            query += 'UPDATE counters SET seedsanalyzedcounter = seedsanalyzedcounter + 1 WHERE id = 1;\n';
            
            for (var key in generatedEntity.pois) {
                
                var poi = generatedEntity.pois[key];
                
                query += 'INSERT INTO poisdistancesearch (poifromtype,poitotype,expression,distance,fromlocationx,fromlocationy,poisearchid,seed,tolocationx,tolocationy,version)';
                query += 'VALUES(' + poi.poiFrom + ',' + poi.poiTo + ',\'' + poi.expression + '\',' + poi.distance   + ','+ poi.fromLocationX +','+ poi.fromLocationY  + ',now(),\'' + generatedEntity.seed + '\',' + poi.toLocationX + ',' + poi.toLocationY + ',\'' + generatedEntity.version + '\');\n';
                
                query += 'UPDATE counters SET poicounter = poicounter + 1 WHERE id = 1;\n';
            }
            
            return query;
        }
    },
    behavior: dgf.behaviors.times(1)
});

model.settings.seed = 1;

dgf.generate(model);
