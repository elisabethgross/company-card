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
  }
}, {
  setterMethods: {
    randomCardNum: function () {
      return Math.random() * (10000000000000000 - 1000000000000000) + 1000000000000000;
    },
    randomCardCvv: function () {
      return Math.random() * (999 + 100) + 100;
    }
  }
});

module.exports = Card;
