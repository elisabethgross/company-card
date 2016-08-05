var router = require('express').Router();
var Card = require('../../../db/models/card');
module.exports = router;

router.get('/', function (req, res, next) {
  Card.findAll({})
  .then(function (cards) {
    res.send(cards);
  })
  .catch(next);
});
