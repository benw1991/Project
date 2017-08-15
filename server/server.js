var express = require('express');
var path 	= require('path');
var app 	= express();

//Change these!
//START setup parameters 	----------
var mainFolder = "NAME_OF_YOUR_PROJECT_FOLDER";
var portNumber = 8081; // specify the server port
//End setup parameters 		----------

//start server
app.use(express.static('../'+mainFolder));
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '', 'index.html') );
})

var server = app.listen(portNumber, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("App listening at http://%s:%s", host, port)
})
