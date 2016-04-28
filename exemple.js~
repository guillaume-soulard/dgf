dgf = require('./');

var model = dgf.newModel();

model.addEntity('user', {
    id: dgf.types.integer.serial({from: 1, next: 1}),
    num: dgf.types.integer.random({from: 1, to: 1000000}),
    name: dgf.types.list(['Nom 1', 'Nom 2', 'Nom 3', 'Nom 3']).random()
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
    behavior: dgf.behaviors.times(1000000)
});

model.seed = 234567890;

dgf.generate(model);