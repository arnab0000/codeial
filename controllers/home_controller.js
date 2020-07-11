const Post = require('../models/post');

//used for showing different user profiles
const User = require('../models/user')

// const { populate } = require('../models/post');

module.exports.home = async function(request, response){
    // console.log(request.cookies);

    // populate is used so that each post can have the name of the user
    // this is ued to fetch the details of user from db by id
    try{
        let post = await Post.find({}).populate('user')
    .populate({
        path: 'comment',
        populate:{
            path: 'user'
        }
    });
    
    let user = await User.find({});
        
    return response.render('home', {
        title: "Codeial | Home",
        post: post,
        all_user: user
    })
    }catch(err){
        console.log('Error', err)
    }    
}


// Post.find({}, function(err, post){
    //     console.log('post', post);
    //     return response.render('home',{
    //         title: "Codeial | Home",
    //         post: post
    //     })
    // })


//module.exports.actionName = function(request, response){};