const User = require('../models/user')

module.exports.profile = function(request, response){
    User.findById(request.params.id, function(err, user){
        return response.render('user_profile', {
            title: "User",
            profile_user: user
        })
    })
};

//render the sign up page
module.exports.signUp = function(request, response){
    if(request.isAuthenticated()){
        return response.redirect('/user/profile');
    }
    return response.render('user_sign_up', {title: "Sign Up Page"})
};

//render the sign In page
module.exports.signIn = function(request, response){
    if(request.isAuthenticated()){
        return response.redirect('/user/profile')
    }
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
    return response.redirect('/user/profile')
};

//logging out of a session
module.exports.destroySession = function(request, response){
    request.logout()
    return response.redirect('/')
}
