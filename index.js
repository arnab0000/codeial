//requiring express
const express = require('express');

//requiring cookie parser
const cookieParser = require('cookie-parser');

//defining port
const port = 8000

//firing up express
const app = express()

//requiring layouts, these lines should be before routes
const expressLayouts = require('express-ejs-layouts')

//connecting database with help of mongoose
const db = require('./config/mongoose')

//importing user schema
const User = require('./models/user');

//requiring sessions for cookie encryption/ session cookie
const session = require('express-session');
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);


//extract styles and script from sub pages into the layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

//sass middleware 
const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src: '/assets/scss',
    dest: '/assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));



//reading through post requests
app.use(express.urlencoded());

//set up cookie parser
app.use(cookieParser());

//linking css js and images, static files
app.use(express.static('./assets'));

//using layouts
app.use(expressLayouts)

//defining view engine
app.set('view engine', 'ejs');

//linking the views folder
//const path = require('path')
//app.set('views', path.join(__dirname, 'views'));
//this can also be done in:
app.set('views', './views');

//middleware for cookie encryption
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok')
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


//use express router
app.use('/', require('./routes'));










//firing up server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`The server is up and running on port: ${port}`);
});