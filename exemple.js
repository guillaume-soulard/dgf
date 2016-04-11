dgf = require('./dgf');

var model = dgf.newModel();

model.addEntity('user', {
    id: dgf.types.integer.serial({from: 1, next: 1}),
    firstName: dgf.types.string.pattern('AAAAAAAAAAAAAAAA'),
    lastName: dgf.types.list(['Nom 1', 'Nom 2', 'Nom 3', 'Nom 3']).random()
});

model.addOutput('userOutput', dgf.outputs.file({
    path: '/home/utilisateur/gen/users.csv',
    encoding: 'utf-8'
}));

model.addGenerator(dgf.newGenerator({
    entity: 'user',
    output: 'userOutput',
    formater: dgf.formatters.csv({
        separator: ';',
        headers: true
    }),
    behavior: dgf.behaviors.times(100000)
}));

model.setSeed(234567890);

dgf.generate(model);