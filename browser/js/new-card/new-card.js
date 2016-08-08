app.config(function($stateProvider) {
  $stateProvider.state('newCard', {
    url: '/new-card',
    templateUrl: 'js/new-card/new-card.html',
    controller: 'NewCardCtrl'
  });
});

app.controller('NewCardCtrl', function ($scope, CardsFactory) {

  $scope.addCard = function () {};
});
