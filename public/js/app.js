var app = angular.module('redditFun', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'MainCtrl',
        templateUrl: '/templates/home.html',
        resolve: {
          postPromise: ['posts', function (posts){
            return posts.getAll();
          }]
        }
    })
      .state('post', {
        url: '/posts/:id',
        templateUrl: '/templates/posts.html',
        controller: 'PostsCtrl'
      });

      $urlRouterProvider.otherwise('home');
}]);
