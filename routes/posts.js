var express = require('express');
// var router = require('./index'); Hadas suggests to do it all under one router
var router = express.Router();

var Post = require('../models/Posts.js')
var Comment = require('../models/Comments.js')


router.post('/', function(req, res, next){
  var post = new Post(req.body);
  post.save(function(err,post){

    if(err){ return next(err)};

    res.json(post)
  });
});

router.param('post', function(req, res, next, id) {
   Post.findById(id).exec(function(err,post){
    if (err) { return next(err);}
    if (!post) { return next(new Error('can\'t find post'));}

    req.post = post;
    return next();
  });
});

router.get('/:post', function(req,res,next){
  req.post.populate('comments',function(err,data){
    res.send(data);
  })
});

router.post('/:post/comments', function(req, res, next){
  var comment = new Comment(req.body);
  comment.post = req.post._id;

  comment.save(function(err,comment){
    if (err) {return next(err);}

  req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
      });
    });
  });



router.get('/', function(req,res,next){
  Post.find({}, function (err, posts){
    res.send(posts)
  });
});


// Increment's upvote for a specific vote
router.put('/:post', function(req,res,next){
     req.post.upVoteByOne();
     req.post.save(function(err,post){
       if(err) {return next(err)};
       res.send(post);
     })
  });


// Increment upvotes by 1 to specific comment
router.put('/:post/comments/:comment', function(req, res, next){
  Comment.findById(req.params.comment, function(err, comment){
   comment.upVoteByOne();
   comment.save(function(err, comment){
     if(err){
       console.log(err);
     }else{
       res.send(comment);
     }
   })
 })
});

module.exports = router;
