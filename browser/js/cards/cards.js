app.config(function ($stateProvider) {
  $stateProvider.state('cards', {
    url: '/cards',
    templateUrl: 'js/cards/cards.html',
    controller: 'CardsCtrl'
  });
});

app.controller('CardsCtrl', function ($scope, CardsFactory) {

  CardsFactory.getAll()
  .then(function (cards) {
    $scope.cards = cards;
  });
});

app.factory('CardsFactory', function ($http) {
  var f = {};

  f.getAll = function () {
    return $http.get('/api/cards')
    .then(function (res) {
      return res.data;
    });
  };

  return f;
});
