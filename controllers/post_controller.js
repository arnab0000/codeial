const Post = require('../models/post');

//comments are required because when we delete post the the comments related to that post is aloso deleted
const Comment = require('../models/comment');

//this part dont need to be converted to async and await as there is only one level of 
module.exports.create = async function(request, response){
    try{
        await Post.create({
            content: request.body.content,
            user: request.user._id
        });
        return response.redirect('back');
    }catch(err){
        console.log("Error", err);
    };
};

module.exports.destroy = async function(request, response){
    try{
        let post = await Post.findById(request.params.id)
    //.id means converting _id into string
        if(post.user == request.user.id){
            post.remove()
            await Comment.deleteMany({post: request.params.id}) 
            return response.redirect('back')
    
        }else{
            return response.redirect('back')
        }
    }catch(err){
        console.log('Error', err)
    }
}