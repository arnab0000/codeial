//requiring express
const express = require('express')

//defining port
const port = 8000

//firing up express
const app = express()

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