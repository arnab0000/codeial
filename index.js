//requiring express
const express = require('express')

//defining port
const port = 8000

//firing up express
const app = express()

//requiring layouts, these lines should be before routes
const expressLayouts = require('express-ejs-layouts')

//extract styles and script from sub pages into the layout
app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

//linking css js and images, static files
app.use(express.static('./assets'));

//using layouts
app.use(expressLayouts)

//use express router
app.use('/', require('./routes'));

//defining view engine
app.set('view engine', 'ejs');

//linking the views folder
//const path = require('path')
//app.set('views', path.join(__dirname, 'views'));
//this can also be done in:
app.set('views', './views');


















//firing up server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`The server is up and running on port: ${port}`);
});