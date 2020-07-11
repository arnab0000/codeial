const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user');


//authenticating user
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
},function(request, email, password, done){
    User.findOne({email: email}, function(err, user){
        if(err){
            request.flash('error', err)
            return done(err)
        }
        if(!user || user.password != password){
            request.flash('error', 'Invalid Username/Password');
            return done(null, false)
        }
        return done(null, user)
    });
}
));

//serialiozing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user, done){
    done(null, user)
});

//deserializing the user from the key in the cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Pssport')
            return done(err)
        }
        return done(null, user) 
    });
});

//check if the user is authenticated
passport.checkAuthentication = function(request, response, next){
    //if the user is signed in then pass on thr request to the next function(controller's action)
    if(request.isAuthenticated()){
        return next();
    }
    //if the user is noty signed in
    return response.redirect('/user/sign-in');
}

//set the views for the user
//this is bascially a middleware to check weather the user is signed in or not
passport.setAuthenticatedUser = function(request, response, next){
    if(request.isAuthenticated()){
        //this locals.user contains the data of user.
        response.locals.user = request.user;
    }
    next();
};


module.exports = passport