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
    type: Sequelize.STRING
  },
  cvv: {
    type: Sequelize.INTEGER
  }
});

module.exports = Card;
