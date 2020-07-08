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
}