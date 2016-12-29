app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
  $scope.posts = posts.posts

  $scope.addPost = function() {
    if ($scope.title === '') { return; }

    $scope.newPost = {
      title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: []
    };

    posts.create($scope.newPost);


    $scope.title = '';
    $scope.link = '';
  }

  $scope.getOnePost = function(id){
    posts.getOnePost(id);
  }

  $scope.incrementUpvotes = function(item) {
      posts.upvote(item);
  }
}]);
