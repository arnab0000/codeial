const Post = require('../models/post');
// const { populate } = require('../models/post');

module.exports.home = function(request, response){
    // console.log(request.cookies);

    // populate is used so that each post can have the name of the user
    // this is ued to fetch the details of user from db by id
    Post.find({}).populate('user')
    .populate({
        path: 'comment',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err, post){
        if(err){
            console.log("Error in populating", err)
        }
        return response.render('home', {
            title: "Codeial | Home",
            post: post
        });
    });
    // Post.find({}, function(err, post){
    //     console.log('post', post);
    //     return response.render('home',{
    //         title: "Codeial | Home",
    //         post: post
    //     })
    // })
};

//module.exports.actionName = function(request, response){}open browser