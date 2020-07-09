const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = function(request, response){
    
    Post.findById(request.body.post, function(err, post){
        
        if (err){
            console.log('Error in comment_controller', err)
        }
        if(post){
            Comment.create({
                content: request.body.content,
                post: request.body.post,
                user: request.user._id
            }, function(err, comment){
                if(err){
                    console.log('Error', err);
                }
                post.comment.push(comment)
                post.save();
                response.redirect('/')
            })
        }
    })
};

module.exports.destroy = function(request, response){
    Comment.findById(request.params.id, function(err, comment){
        if(comment.user == request.user.id){
            let postId = comment.post;
            comment.remove()
            Post.findByIdAndUpdate(postId, {$pull: {comment: request.params.id}}, function(err, post){
                return response.redirect('back')
            })
        }
    })
};