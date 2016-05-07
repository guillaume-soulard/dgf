dgf = require('./');

var model = dgf.newModel();

model.addEntity('user', {
    id: dgf.types.integer.serial({from: 1, next: 1}),
    num: dgf.types.integer.random({from: 1, to: 1000000}),
    name: dgf.types.list(['Nom 1', 'Nom 2', 'Nom 3', 'Nom 3']).random(),
    day_of_birth: dgf.types.date.random({from: new Date(2016, 0, 1, 0, 0, 0), to: new Date (2016, 11, 31, 23, 59, 0), format: 'dd/mm/yyyy'})
});

model.addOutput('userOutput', dgf.outputs.file({
    path: '/tmp/users.csv',
    encoding: 'utf-8'
}));

model.addGenerator({
    entity: 'user',
    output: 'userOutput',
    formater: dgf.formatters.csv({
        separator: ';',
        headers: true
    }),
    behavior: dgf.behaviors.times(10000000)
});

model.seed = 234567890;

dgf.generate(model);
