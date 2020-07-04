module.exports.home = function(request, response){
    console.log(request.cookies);
    return response.render('home', {title: "Home"});
}

//module.exports.actionName = function(request, response){}