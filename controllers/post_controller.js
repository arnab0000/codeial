const Post = require('../models/post');

//comments are required because when we delete post the the comments related to that post is aloso deleted
const Comment = require('../models/comment');

module.exports.create = function(request, response){
    Post.create({
        content: request.body.content,
        user: request.user._id
    },function(err, post){
        if(err){
            console.log('Error in creating post');
            return;
        }
        return response.redirect('back')
    })
};

module.exports.destroy = function(request, response){
    Post.findById(request.params.id, function(err, post){
        //.id means converting _id into string
        if(post.user == request.user.id){
            post.remove()
            Comment.deleteMany({post: request.params.id}, function(err){
                return response.redirect('back')
            })
        }else{
            return response.redirect('back')
        }
    })
}