#DGF (Data Generation Framework)

DGF est un Framework node JS qui permet de faciliter la génération de données de test.

#Exemple

L'exemple ci-dessous permet de générer un fichier CSV contenant des utilisateurs

```javascript
require('dgf'); 
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

// generate as CSV
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
    behavior: dgf.behaviors.times(1000) // generate 1000 users
});

model.settings.seed = 234567890;

dgf.generate(model);

```

#Architecture

La librairie DGF comporte les éléments suivants : 

+Des entités : ce sont les éléments qui vont servir de modèle à la génération des données.
+Des type de données : Ormi les types javascript standards (chaîne de caractère, nombre, date, tableaux, ...)..
...Il existe des types spéciaux qui vont servir à définir le comportement à adopter pour la génération..
...(générer un nombre entre 0 et 10 par exemple).
+Les formateurs : ce sont eux qui à partir des entitées générées vont transformer les données en un format spécifique (exemple : CSV, SQL, ...)
+Les sorties : qui vont définir comment les données générées et formatées vont être publiées (fichier, stdout, ou autre).
+Les comportements : servent à définir la quantité de données à générer (par exemples : 1000 utilisateurs)

Le processus de génération suit le schéma suivant : 

<TODO>

#API

##Generation types

Lors de la création d'entités, il est possible de spécifier des types prédéfinits pour la génération des données.

###Entiers

####Random
<Description>
<Format>
<Exemple>

###Dates

###Chaînes de caractères

###Tableaux

###Listes

##Les formateurs

##Les sorties

##Les comportments

##Les paramètres du modèle
###Format de date par défaut
###La graine
