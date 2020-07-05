const User = require('../models/user')

module.exports.profile = function(request, response){
    if(request.cookies.user_id){
        User.findById(request.cookies.user_id, function(err, user){
            if(user){
                return response.render('user_profile', {title: "User Profile", user: user})
            }
            return response.redirect('/user/sign-in')
        })
    }else{
        return response.redirect('/user/sign-in')
    }

};

//render the sign up page
module.exports.signUp = function(request, response){
    return response.render('user_sign_up', {title: "Sign Up Page"})
};

//render the sign In page
module.exports.signIn = function(request, response){
    return response.render('user_sign_in', {title: "Sign In Page"})
};

//get the sign up data
module.exports.create = function(request, response){
    if(request.body.password != request.body.confirmPassword){
        return response.redirect('back')
    }
    User.findOne({email: request.body.email}, function(err, user){
        if(err){console.log('Error in finding user in signing up'); return;}
        if(!user){
            User.create(request.body, function(err, user){
                if(err){console.log('Error in signing up'); return;}

                return response.redirect('/user/sign-in')
            })
        }else{
            return response.redirect('back')
        }
    })
};

//logging into a session
module.exports.createSession = function(request, response){
    //steps to authenticate
    //find the user
    User.findOne({email: request.body.email}, function(err, user){
        if(err){console.log('Error in finding user in signing up'); return;}
        //if user not found
        if(!user){
            return response.redirect('back')
        }else{
            //if user found and password donot match
            if(user.password != request.body.password){
                return response.redirect('back')
            }else{
                //handling session creation
                response.cookie('user_id', user.id)
                return response.redirect('/user/profile')
            }
        }
    })
};