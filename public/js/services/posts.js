app.factory('posts', ['$http', function($http){
  var postService = {

    posts: [],

    post: {},

    getAll: function(){
    return $http.get('/posts').then(function(data){
      angular.copy(data.data, postService.posts);
    });
  },

  // for GETting one post and it's comments
        getOnePost: function(id) {
          return $http.get('/posts/' + id).then(function(data){
            angular.copy(data.data, postService.post);
          });
        },

        // for POSTing one new post
        create: function(newPost) {
            return $http.post('/posts/', newPost).then(function(data){
              postService.posts.push(data.data);
            });
        },

        // for increasing the upvotes to one post
        upvote: function(post) {
          return $http.put('/posts/' + post).then(function(data){
            console.log(data.data.upvotes);
            for (var i = 0; i < postService.posts.length; i++) {
              if(postService.posts[i]._id == post){
                postService.posts[i].upvotes++;
                return;
              }
            }
          });
        },

        // for adding a comment to one post
        addComment: function(id, comment) {
          return $http.post('/posts/'+ id +'/comments', comment).then(function(data){
                postService.post.comments.push(data.data);
          });
        },

        // for upvoting a comment on a specific post
        upvoteComment: function(post, comment) {
          return $http.put('/posts/' + post.id + '/comments/' + comment._id, comment).then(function(data){
            comment.upvotes++;
          })
        }

}
  return postService;
}]);
