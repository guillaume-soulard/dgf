dgf = require('./');

var model = dgf.newModel();

model.addEntity('user', {
    id: dgf.types.integer.serial({
        from: 1, 
        next: 1
    }),
    num: dgf.types.integer.random({
        from: 1, 
        to: 1000000
    }),
    name: dgf.types.string.pattern({
        pattern: '#{zzzzzzz} #{zzzzzzzz}'
    }),
    day_of_birth: dgf.types.date.random({
        from: new Date(2016, 0, 1, 0, 0, 0), 
        to: new Date (2016, 11, 31, 23, 59, 0), 
        format: 'dd/mm/yyyy'
    }),
    tags: dgf.types.array.random({
        from: 0,
        to: 7,
        object: dgf.types.list(['tag 1',
                          'tag 2', 
                          'tag 3', 
                          'tag 3']).random()
    })
});

model.addOutput('userOutput', dgf.outputs.stdout());

model.addGenerator({
    entity: 'user',
    output: 'userOutput',
    formater: {
        formatBegin: function (entityTemplate) {

            return '';
        },
        formatEnd: function (entityTemplate) {

            return '';
        },
        formatEntity: function (generatedEntity) {
            return 'INSERT INTO user (id, num, name, day_of_birth, tags) VALUES (' + generatedEntity.id + ',' + generatedEntity.num + ',' + generatedEntity.name + ',' + generatedEntity.day_of_birth + ',' + generatedEntity.tags + ');';
        }
    },
    behavior: dgf.behaviors.times(10)
});

model.settings.seed = 234567890;

dgf.generate(model);
