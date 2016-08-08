var router = require('express').Router();
var Card = require('../../../db/models/card');
var braintree = require('braintree');

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "jp3ytdqkpbfsgcn6",
    publicKey: "c63w2pdxhz6hgthc",
    privateKey: "d6adf97f9b029e741b2bad38a48143d7"
});

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

// router.get('/checkout', function (req, res) {
//     gateway.clientToken.generate({}, function (err, res) {
//        res.json({clientToken: res.clientToken});
//     });
// });

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
  var limit = req.body.limit.slice(1, req.body.limit.length-1);
  gateway.transaction.sale({
    amount: limit,
    customer: {
      firstName: req.body.name,
    },
    paymentMethodNonce: "fake-valid-nonce",
    options: {
      submitForSettlement: true
    }
  }, function (err, result) {
    if (err) console.log(err);
    else console.log(result);
  });
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
