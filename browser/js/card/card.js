app.config(function($stateProvider) {
  $stateProvider.state('card', {
    url: '/cards/:id',
    templateUrl: 'js/card/card.html',
    controller: 'CardCtrl'
  });
});

app.controller('CardCtrl', function ($scope, CardsFactory, $stateParams) {
  var id = $stateParams.id;

  CardsFactory.getOne(id)
  .then(function (card) {
    $scope.card = card;
  });

});
