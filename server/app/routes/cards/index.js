var router = require('express').Router();
var Card = require('../../../db/models/card');
module.exports = router;

router.param('id', function(req, res, next, id) {
  Card.findById(id)
  .then(function(card) {
    if (!card) {
      throw new Error('Card not found!');
    }
    req.card = card;
    next();
    return null;
  })
  .catch(next);
});

router.get('/', function (req, res, next) {
  Card.findAll({})
  .then(function (cards) {
    res.send(cards);
  })
  .catch(next);
});

router.get('/:id', function (req, res) {
  res.json(req.card);
});

router.post('/', function (req, res, next) {
  Card.create(req.body)
  .then(function (card) {
    res.send(card);
  })
  .catch(next);
});

router.put('/:id', function(req, res, next) {
  req.card.update(req.body)
  .then(function() {
    return Card.findById(req.params.id);
  })
  .then(function(updatedCard) {
    res.send(updatedCard);
  })
  .catch(next);
});

router.delete('/:id', function(req, res, next) {
  req.card.destroy()
  .then(function() {
    res.sendStatus(204);
  })
  .catch(next);
});
