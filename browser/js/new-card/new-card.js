app.config(function($stateProvider) {
  $stateProvider.state('newCard', {
    url: '/new-card',
    templateUrl: 'js/new-card/new-card.html',
    controller: 'NewCardCtrl'
  });
});

app.controller('NewCardCtrl', function ($scope, CardsFactory, $state) {

  $scope.addCard = function () {
    $scope.card.number = Math.random() * (10000000000000000 - 1000000000000000) + 1000000000000000;
    $scope.card.cvv = Math.random() * (999-100) + 100;
    CardsFactory.createOne($scope.card)
    .then(function (card) {
      $state.go('card', {id: card.id});
    });
  };
});
