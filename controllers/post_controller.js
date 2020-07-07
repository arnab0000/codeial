const Post = require('../models/post');

module.exports.create = function(request, response){
    Post.create({
        content: request.body.content,
        user: request.body._id
    },function(err, post){
        if(err){
            console.log('Error in creating post');
            return;
        }
        return response.redirect('back')
    })
};