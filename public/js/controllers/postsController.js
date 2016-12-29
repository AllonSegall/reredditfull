app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts) {

  posts.getOnePost($stateParams.id).then(function(){
    $scope.post = posts.post;
  });


  $scope.addComment = function() {
    if ($scope.body === '') { return; }


    var newComment = {
      body: $scope.body,
      author: 'user',
      upvotes: 0
    };

    posts.addComment($stateParams.id, newComment);

    $scope.body = '';
  }

  $scope.upvoteComment = function(item) {
      posts.upvoteComment($stateParams, item);
  }

}]);
