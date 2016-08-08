var Sequelize = require('sequelize');
var db = require('../_db');

var Card = db.define('card', {
  name: {
    type: Sequelize.STRING
  },
  number: {
    type: Sequelize.STRING
  },
  expiration: {
    type: Sequelize.STRING,
    defaultValue: '5/19'
  },
  cvv: {
    type: Sequelize.INTEGER
  },
  limit: {
    type: Sequelize.STRING,
    defaultValue: 'None'
  }
});

module.exports = Card;
