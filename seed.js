/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Card = db.model('card');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            admin: false
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            admin: true
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedCards = function () {

    var cards = [
        {
            name: 'Elisabeth Gross',
            number: '4266723416252345',
            expiration: '04/17',
            cvv: 345
        }, {
            name: 'Dasha Sominski',
            number: '1234523413252345',
            expiration: '03/17',
            cvv: 662
        }, {
            name: 'Becky Somgross',
            number: '4538976413252005',
            expiration: '02/17',
            cvv: 602
        },

    ];

    var creatingCards = cards.map(function(cardObj){
        return Card.create(cardObj);
    });

    return Promise.all(creatingCards);
}

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function () {
        return seedCards();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
